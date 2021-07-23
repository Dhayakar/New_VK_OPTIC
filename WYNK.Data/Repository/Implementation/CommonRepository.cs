using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using WYNK.Data.Common;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Data.Repository.Operation;

namespace WYNK.Data.Repository.Implementation
{
    public class CommonRepository : RepositoryBase<Dropdown>, ICommonRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;


        public CommonRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }

        public const string saved = "Saved Successfully";

        public const string Missing = "GST Number Already Exists";

        public const Boolean Active = true;



        #region Dynamic Dropdown

        public async Task<IEnumerable<Dropdown>> GetDropdown(string tableName, string valueColumn, string textColumn, string whereColumn = null, string whereValue = null)
        {
            try
            {
                var table = (IQueryable)CMPSContext.GetType().GetProperty(tableName).GetValue(CMPSContext, null);

                KeyValuePair<PropertyInfo, PropertyInfo> sourceDestPropMap1 = new KeyValuePair<PropertyInfo, PropertyInfo>(
                    typeof(Dropdown).GetProperty("Text"), table.ElementType.GetProperty(textColumn));

                KeyValuePair<PropertyInfo, PropertyInfo> sourceDestPropMap2 = new KeyValuePair<PropertyInfo, PropertyInfo>(
                    typeof(Dropdown).GetProperty("Value"), table.ElementType.GetProperty(valueColumn));

                var paramExpr = Expression.Parameter(table.ElementType, "x");
                var propertyA = Expression.Property(paramExpr, sourceDestPropMap1.Value);
                var propertyB = Expression.Property(paramExpr, sourceDestPropMap2.Value);
                var propertyBToString = Expression.Call(propertyB, typeof(object).GetMethod("ToString"));

                object query = null;
                if (!string.IsNullOrWhiteSpace(whereColumn) && !string.IsNullOrWhiteSpace(whereValue))
                {
                    var whereProp = Expression.Property(paramExpr, whereColumn);
                    dynamic value;
                    if (whereProp.Type.FullName.Contains("System.Int"))
                        value = Convert.ToInt32(whereValue);
                    else
                        value = whereValue;
                    var filter = Expression.Lambda(Expression.Equal(Expression.Property(paramExpr, whereColumn), Expression.Constant(value)), paramExpr);
                    query = Call(Where.MakeGenericMethod(paramExpr.Type), table, filter);
                }
                var createObject = Expression.New(typeof(Dropdown));
                var initializePropertiesOnObject = Expression.MemberInit(
                    createObject,
                    new[]
                    {
                        Expression.Bind(sourceDestPropMap1.Key, propertyA),
                        Expression.Bind(sourceDestPropMap2.Key, propertyBToString)
                    });

                var selectExpression = Expression.Lambda(initializePropertiesOnObject, paramExpr);

                query = Call(Select.MakeGenericMethod(paramExpr.Type, typeof(Dropdown)), query != null ? query : table, selectExpression);
                var result = (IEnumerable<Dropdown>)query;
                return result.OrderBy(x => x.Text);
            }
            catch (Exception e)
            {

                throw;
            }
        }
        private static readonly MethodInfo Select = GetGenericMethodDefinition<
            Func<IQueryable<object>, Expression<Func<object, object>>, IQueryable<object>>>((source, selector) =>
            Queryable.Select(source, selector));
        private static readonly MethodInfo Where = GetGenericMethodDefinition<
            Func<IQueryable<object>, Expression<Func<object, bool>>, object>>((source, predicate) =>
            Queryable.Where(source, predicate));
        private static readonly MethodInfo FirstOrDefault = GetGenericMethodDefinition<
            Func<IQueryable<object>, object>>(source =>
            Queryable.FirstOrDefault(source));
        private static MethodInfo GetGenericMethodDefinition<TDelegate>(Expression<TDelegate> e)
        {
            return ((MethodCallExpression)e.Body).Method.GetGenericMethodDefinition();
        }
        private static object Call(MethodInfo method, params object[] parameters)
        {
            return method.Invoke(null, parameters);
        }
        #endregion

        public IEnumerable<Dropdown> GetInsuranceData()
        {

            var INS = WYNKContext.Insurance.ToList();
            var INSVsMM = WYNKContext.InsuranceVsMiddlemen.ToList();
            return (from I in INSVsMM.Where(x => x.MiddleMenID == null && x.IsActive == false)
                    join IVM in INS on I.IID equals IVM.ID
                    where IVM.IsActive == false
                    select new Dropdown
                    {
                        Text = IVM.Name,
                        Values = I.IID,
                        Value = I.ID.ToString()
                    }).ToList();

        }
        public IEnumerable<Dropdown> GetMiddleManData(int IID)
        {

            var INS = WYNKContext.Insurance.ToList();
            var INSVsMM = WYNKContext.InsuranceVsMiddlemen.ToList();
            return (from I in INSVsMM.Where(x => x.IID == IID && x.MiddleMenID != null && x.IsActive == false)
                    join IVM in INS on I.MiddleMenID equals IVM.ID
                    where IVM.IsActive == false
                    select new Dropdown
                    {
                        Text = IVM.Name,
                        Value = I.ID.ToString()
                    }).ToList();

        }

        public IEnumerable<Dropdown> GetChartype()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "CT" && x.IsActive == true && x.IsDeleted == false && x.ParentID != 0).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString(), Amt = x.Amount }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetRoomType()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "RoomType" && x.IsActive == true && x.IsDeleted == false && x.ParentID != 0).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString(), Amt = x.Amount }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetLocvalues()
        {
            return CMPSContext.LocationMaster.Where(x => x.IsActive == true).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetMiddleman()
        {
            return WYNKContext.Insurance.Where(x => x.InsuranceCategory == 1 && x.IsActive == false).Select(x => new Dropdown { Text = x.Name, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> Getinstitute(int ID)
        {
            return WYNKContext.UniversityExt.Where(x => x.IsActive == true && x.UniversityCode == ID).Select(x => new Dropdown { Text = x.UniversityExtDescription, Value = x.UniversityExtCode.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public dynamic Getstorecatgtypes(int cmpid)
        {
            //var INS = CMPSContext.OneLineMaster.Where(x =>x.ParentTag == "DEPT").ToList();
            //var INSVsMM = CMPSContext.Storemasters.Where(x => x.CmpID == cmpid && x.IsActive == true && x.IsDelete == false).ToList();
            //return (from I in INSVsMM
            //        join IVM in INS on I.CatgType equals IVM.OLMID
            //        where IVM.IsActive == false
            //        select new Dropdown
            //        {
            //            Text = IVM.ParentDescription,
            //            Value = I.CatgType.ToString()
            //        }).ToList();
            return CMPSContext.OneLineMaster.Where(x => x.IsActive == true && x.ParentTag == "DEPT").Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString(), status = x.IsActive }).OrderBy(x => x.Text).ToList();
        }
        public dynamic Getstorecatgalltypes(int cmpid)
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "DEPT").Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString(), status = x.IsActive }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetRoleDescription()
        {
            return CMPSContext.Role.Where(x => x.IsDeleted == false).Select(x => new Dropdown { Text = x.RoleDescription, Value = x.RoleID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetInsurance()
        {
            return WYNKContext.Insurance.Where(x => x.InsuranceCategory == 0 && x.IsActive == false).Select(x => new Dropdown { Text = x.Name, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetCampNames()
        {
            return WYNKContext.CAMP.Where(x => x.IsActive == true).Select(x => new Dropdown { Text = x.CampName, Value = x.CampID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetOrgtype()
        {
            return CMPSContext.OneLineMaster.Where(x => x.IsActive == true && x.ParentTag == "CMPORG" && x.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription.ToString(), Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetOrgtypealldata()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "CMPORG" && x.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription.ToString(), Value = x.OLMID.ToString(), status = x.IsActive }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetFrameStyle()
        {
            return CMPSContext.OneLineMaster.Where(x => x.IsActive == true && x.ParentTag == "FrameStyle" && x.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription.ToString(), Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetFrameWidth()
        {
            return CMPSContext.OneLineMaster.Where(x => x.IsActive == true && x.ParentTag == "FrameWidth" && x.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription.ToString(), Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetFrameType()
        {
            return CMPSContext.OneLineMaster.Where(x => x.IsActive == true && x.ParentTag == "FrameType" && x.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription.ToString(), Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetFrameShape()
        {
            return CMPSContext.OneLineMaster.Where(x => x.IsActive == true && x.ParentTag == "FrameShape" && x.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription.ToString(), Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> Getindex()
        {
            return CMPSContext.OneLineMaster.Where(x => x.IsActive == true && x.ParentTag == "IX" && x.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription.ToString(), Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetStatesvalues()
        {
            return CMPSContext.LocationMaster.Where(x => x.ParentTag == "State" && x.IsActive == true).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();

        }


        public IEnumerable<Dropdown> getDetails()
        {
            var lo = CMPSContext.LocationMaster.ToList();
            var id = (from LO in lo.Where(x => x.ParentDescription == "Country")
                      select new COUN
                      {
                          id = LO.ID
                      }).ToList();
            return CMPSContext.LocationMaster.Where(x => x.ParentID == System.Convert.ToInt32(id[0].id)).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> getDetailsstate(int id)
        {
            return CMPSContext.LocationMaster.Where(x => x.ParentID == id && x.ParentTag == "State").Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> getDetailsdistrict(int id)
        {
            return CMPSContext.LocationMaster.Where(x => x.ParentID == id && x.ParentTag == "city").Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> getDetailslocation(int id)
        {
            return CMPSContext.LocationMaster.Where(x => x.ParentID == id && x.ParentTag == "loc").Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }


        public IEnumerable<Dropdown> GetTranTypes()
        {
            return CMPSContext.TransactionType.Select(x => new Dropdown { Text = x.Description, Value = x.TransactionID.ToString() }).OrderBy(x => x.Value).ToList();
        }

        //------------------Employeemasterdropdownvalues---------------
        public IEnumerable<Dropdown> GetBloodGroups()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "BloodGroup").Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ParentDescription }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetNumberControlDes()
        {
            return CMPSContext.TransactionType.Select(x => new Dropdown { Text = x.Description, Value = x.TransactionID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetlocDropdownvalues()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "loc" && x.IsActive == true).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }


        public IEnumerable<Dropdown> GetTitles()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "Title" && x.IsActive == true && x.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ParentDescription }).OrderBy(x => x.Text).ToList();
        }

        public dynamic GetCountryDetail(int cmpid)
        {
            var countryCode = CMPSContext.Setup.Where(x => x.CMPID == cmpid).Select(x => x.Country).FirstOrDefault();

            var CountryDetail = CMPSContext.Country.Where(x => x.ID == Convert.ToInt32(countryCode)).Select(x => x.CountryName).FirstOrDefault();
            return new
            {
                CountryDetail = CountryDetail
            };
        }

        //public IEnumerable<Dropdown> Desc()
        //{
        //    return (from e in WYNKContext.OcularComplaints.GroupBy(x => x.Description)
        //            select new Dropdown
        //            {
        //                Text = e.Select(x => x.Description).FirstOrDefault().ToString(),
        //                Value = e.Select(x => x.ID).FirstOrDefault().ToString(),
        //            }).OrderBy(x => x.Text).ToList();



        //}



        public IEnumerable<Dropdown> Desc()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "OcularComplaints" && x.IsActive == true && x.IsDeleted == false && x.ParentDescription != " ").Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();

        }
        public IEnumerable<Dropdown> Descc()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "SystemicCondition" && x.IsActive == true && x.IsDeleted == false && x.ParentDescription != " ").Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();

        }
        public dynamic Getocularvalues()
        {
            var getData = new RefractionMasterss();

            getData.categoryhis = (from details in CMPSContext.OneLineMaster.Where(x => x.ParentTag == "OcularComplaints" && x.IsDeleted == false && x.ParentDescription != " ")
                                   select new categoryhis
                                   {
                                       ID = details.OLMID,
                                       Description = details.ParentDescription,
                                       IsActive = details.IsActive == true ? "Active" : "InActive",
                                       Active = details.IsActive,
                                   }).OrderBy(x => x.Description).ToList();

            return getData;

        }
        public dynamic Getsystemicvalues()
        {
            var getData = new RefractionMasterss();

            getData.categoryhis = (from details in CMPSContext.OneLineMaster.Where(x => x.ParentTag == "SystemicCondition" && x.ParentDescription != " " && x.IsDeleted == false)
                                   select new categoryhis
                                   {
                                       ID = details.OLMID,
                                       Description = details.ParentDescription,
                                       IsActive = details.IsActive == true ? "Active" : "InActive",
                                       Active = details.IsActive,
                                   }).OrderBy(x => x.Description).ToList();

            return getData;

        }

        //public IEnumerable<Dropdown> Descc()
        //{

        //    return (from g in WYNKContext.PatientHistory.GroupBy(x => x.Description)
        //            select new Dropdown
        //            {
        //                Text = g.Select(x => x.Description).FirstOrDefault().ToString(),
        //                Value = g.Select(x => x.ID).FirstOrDefault().ToString(),
        //            }).OrderBy(x => x.Text).ToList();


        //}
        //public IEnumerable<Dropdown> GetLastNamevalues()
        //{

        //            return (from OLM in CMPSContext.OneLineMaster
        //                    join DS in CMPSContext.DoctorSpeciality on OLM.OLMID equals DS.OLMID
        //            join DM in CMPSContext.DoctorMaster on DS.DoctorID equals DM.DoctorID
        //                    where (DM.IsDeleted != true && OLM.OLMID == 189)
        //                    select new Dropdown
        //            {
        //                Text = DM.LastName,
        //                Value = DM.DoctorID.ToString()
        //            }).OrderBy(x => x.Text).Distinct().ToList();
        //}
        //public IEnumerable<Dropdown> GetEyeLastNamevalues()
        //{

        //    return (from OLM in CMPSContext.OneLineMaster
        //            join DS in CMPSContext.DoctorSpeciality on OLM.OLMID equals DS.OLMID
        //            join DM in CMPSContext.DoctorMaster on DS.DoctorID equals DM.DoctorID
        //            where (DM.IsDeleted != true && OLM.OLMID == 188)
        //            select new Dropdown
        //            {
        //                Text = DM.LastName,
        //                Value = DM.DoctorID.ToString()
        //            }).OrderBy(x => x.Text).Distinct().ToList();
        //}


        //public IEnumerable<Dropdown> GetEyedoctorvalues()
        //{

        //    return (from OLM in CMPSContext.OneLineMaster.Where(u => u.OLMID == 188)
        //            join DS in CMPSContext.DoctorSpeciality on OLM.OLMID equals DS.OLMID
        //            join DM in CMPSContext.DoctorMaster on DS.DoctorID equals DM.DoctorID
        //            where (DM.IsDeleted != true)
        //            select new Dropdown
        //            {
        //                Text = DM.LastName,
        //                Value = DM.DoctorID.ToString()
        //            }).OrderBy(x => x.Text).Distinct().ToList();
        //}



        public IEnumerable<Dropdown> getrolevalues()
        {
            return CMPSContext.Role.Select(x => new Dropdown { Text = x.RoleDescription, Value = x.RoleID.ToString() }).OrderBy(x => x.Text).ToList();
        }


        public IEnumerable<Dropdown> getrolevaluesexceptadmin()
        {
            return CMPSContext.Role.Where(x => x.RoleDescription != "Nurse" && x.RoleDescription != "Chief Nurse" && x.IsDeleted == false).Select(x => new Dropdown { Text = x.RoleDescription, Value = x.RoleID.ToString() }).OrderBy(x => x.Text).ToList();
        }


        public IEnumerable<Dropdown> GetICDvalues()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "ICD GROUP" && x.IsActive == true && x.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ParentID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetViewvalues()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "RegStatus" && x.IsActive == true).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }


        public IEnumerable<Dropdown> Getpaymentvalues()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "PayMode" && x.IsActive == true && x.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ParentDescription }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetRelation()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "REL" && x.IsActive == true && x.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ParentDescription }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetMaritalStatus()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "MaritalStatus" && x.IsActive == true).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Value).ToList();
        }
        //public IEnumerable<Dropdown> GetINESTIAFvalues()
        //{
        //    return WYNKContext.ICDMaster.Where(x => x.ICDGroup == "inv" && x.IsActive == true).Select(x => new Dropdown { Text = x.ICDDESCRIPTION, Value = x.ICDCODE.ToString() }).OrderBy(x => x.Text).ToList();
        //}


        public IEnumerable<Dropdown> Gettonometrymas(int Cmpid)
        {
            return WYNKContext.Tonometry.Where(x => x.IsActive == true && x.Cmpid == Cmpid).Select(x => new Dropdown { Text = x.Description, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();

        }

        public IEnumerable<Dropdown> getdatetime(int cmpid, string uin, string Time)
        {

            var reg = WYNKContext.Registration.ToList();
            var regt = WYNKContext.RegistrationTran.ToList();

            var rr = WYNKContext.RegistrationTran.Where(x => x.UIN == uin).Select(x => x.RegistrationTranID).LastOrDefault();
            TimeSpan ts = TimeSpan.Parse(Time);
            return (from r in reg
                    join rt in regt on r.UIN equals rt.UIN
                    where r.CMPID == cmpid && rt.RegistrationTranID == rr

                    select new Dropdown
                    {
                        DateTime = rt.DateofVisit.Add(ts),
                        Value = rt.RegistrationTranID.ToString()
                    });

        }

        public IEnumerable<Dropdown> Getdocnae(int Cmpid)
        {
            var users = CMPSContext.Users.ToList();

            return (from OLM in CMPSContext.DoctorMaster.Where(OLM => OLM.IsActive == true && OLM.CMPID == Cmpid && OLM.IsDeleted == false)
                    select new Dropdown
                    {
                        Text = OLM.Firstname + " " + OLM.MiddleName + " " + OLM.LastName,
                        Value = OLM.DoctorID.ToString(),
                        itemvalue = Convert.ToString(users.Where(x => x.Username == OLM.EmailID).Select(x => x.Userid).FirstOrDefault()),
                    }).OrderBy(x => x.Text).ToList();
        }




        public IEnumerable<Dropdown> Getdoctorvalues()
        {
            return CMPSContext.DoctorMaster.Select(x => new Dropdown { Text = x.LastName, Value = x.DoctorID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetCompdoctorvalues(int Cmpid)
        {
            return CMPSContext.DoctorMaster.Where(x => x.CMPID == Cmpid && x.IsActive == true).Select(x => new Dropdown { Text = x.Firstname + (x.MiddleName != null ? x.MiddleName : "") + x.LastName, Value = x.DoctorID.ToString() }).OrderBy(x => x.Text).ToList();
        }


        //public IEnumerable<Dropdown> GetFINDINGSSTATUSvalues()
        //{
        //    return WYNKContext.ICDMaster.Where(x => x.ICDGroup == "slt" && x.IsActive == true).Select(x => new Dropdown { Text = x.ICDDESCRIPTION, Value = x.ICDCODE.ToString() }).OrderBy(x => x.Text).ToList();
        //}

        public IEnumerable<Dropdown> Getsurgerydescvalues()
        {
            return WYNKContext.ICDMaster.Select(x => new Dropdown { Text = x.ICDDESCRIPTION, Value = x.ICDCODE.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetRegistrationsourceofrefvalues()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "SOR" && x.IsActive == true).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetRegistrationTypeofvisistvalues()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "TOV" && x.IsActive == true).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetregDropdownvalues()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "RegStatus" && x.IsActive == true).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }



        //------------------Docotormasterdropdownvalues---------------

        public IEnumerable<Dropdown> GetDescvalues(int id)
        {

            return WYNKContext.ICDMaster.Where(X => X.IsDeleted == false && X.IsActive == true && X.SpecialityCode == id).Select(x => new Dropdown { Text = x.ICDDESCRIPTION, Value = x.ICDCODE }).OrderBy(x => x.Text).ToList();

        }
        public IEnumerable<Dropdown> GetEngageDropdownvalues()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "ET" && x.IsActive == true && x.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetspecDropdownvalues()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "ST" && x.IsActive == true && x.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetICDSpecialityCode()
        {
            return WYNKContext.ICDSpecialityCode.Where(x => x.IsActive == true).Select(x => new Dropdown { Text = x.SpecialityDescription, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> getallroles()
        {
            return CMPSContext.Role.Select(x => new Dropdown { Text = x.RoleDescription, Value = x.RoleID.ToString() }).OrderBy(x => x.Text).ToList();
        }


        //------------------Docotormasterdropdownvalues(END)---------------
        public IEnumerable<Dropdown> GetopiniondoctorDropdownvalues()
        {
            return CMPSContext.DoctorMaster.Select(x => new Dropdown { Text = x.LastName, Value = x.DoctorID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetmedicineDropdownvalues()
        {
            return WYNKContext.DrugMaster.Select(x => new Dropdown { Text = x.Brand, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetICDDropdownvalues()
        {
            return CMPSContext.OneLineMaster.Where(X => X.ParentTag == "ICD GROUP" && X.IsActive == true && X.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }



        //--------------------------------refractiondropdown values-------------------------------------------------------------------

        public IEnumerable<Dropdown> GetDVvaluesdis()
        {
            return CMPSContext.OneLineMaster.Where(X => X.ParentTag == "CTDV" && X.IsActive == true && X.IsDeleted == false).OrderBy(x => x.OLMID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).ToList();
        }

        public IEnumerable<Dropdown> GetNVvaluesnear()
        {
            return CMPSContext.OneLineMaster.Where(X => X.ParentTag == "CTNV" && X.IsActive == true && X.IsDeleted == false).OrderBy(x => x.ParentDescription).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).ToList();
        }

        public IEnumerable<Dropdown> GetCATvalues()
        {
            return CMPSContext.OneLineMaster.Where(X => X.ParentTag == "CAT" && X.IsActive == true && X.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }



        public IEnumerable<Dropdown> getanathesthist()
        {

            var one = CMPSContext.OneLineMaster.ToList();
            var dm = CMPSContext.DoctorMaster.ToList();
            var ds = CMPSContext.DoctorSpeciality.ToList();
            return (from dom in dm
                    join dos in ds on dom.DoctorID equals dos.DoctorID
                    join oneline in one on dos.OLMID equals oneline.OLMID
                    where (oneline.ParentDescription == "Anaesthetist" && dom.IsActive == true)
                    select new Dropdown
                    {
                        Text = dom.Firstname + " " + dom.MiddleName + " " + dom.LastName,
                        Value = dom.DoctorID.ToString()
                    }).OrderBy(x => x.Text).ToList();

        }



        public IEnumerable<Dropdown> GetINvalues()
        {
            return CMPSContext.OneLineMaster.Where(X => X.ParentTag == "IN" && X.IsActive == true && X.IsDeleted == false).OrderBy(x => x.OLMID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).ToList();
        }

        public IEnumerable<Dropdown> GetDVvalues()
        {
            return CMPSContext.OneLineMaster.Where(X => X.ParentTag == "ADV" && X.IsActive == true && X.IsDeleted == false).OrderByDescending(x => x.ParentDescription).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).ToList();
        }

        public IEnumerable<Dropdown> GetNVvalues()
        {
            return CMPSContext.OneLineMaster.Where(X => X.ParentTag == "NV" && X.IsActive == true && X.IsDeleted == false).OrderByDescending(x => x.ParentDescription).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).ToList();
        }

        public IEnumerable<Dropdown> GetGoniovalues()
        {
            return CMPSContext.OneLineMaster.Where(X => X.ParentTag == "Gonioscopy" && X.IsActive == true && X.IsDeleted == false).OrderBy(x => x.OLMID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).ToList();
        }



        public IEnumerable<Dropdown> Getlensvalues()
        {
            return WYNKContext.Lensmaster.Select(x => new Dropdown { Text = x.LensType, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        //--------------------------------refractiondropdown values-------------------------------------------------------------------

        //-----------------------medicinevalues--------------------------------




        public IEnumerable<Dropdown> GetDossgevalues()
        {
            return CMPSContext.OneLineMaster.Where(X => X.ParentTag == "Dossage" && X.IsActive == true && X.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetFYvalues()
        {
            return CMPSContext.OneLineMaster.Where(X => X.ParentTag == "FY" && X.IsActive == true && X.IsDeleted == false).OrderByDescending(x => x.OLMID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).ToList();
        }
        public IEnumerable<Dropdown> GetFDvalues()
        {
            return CMPSContext.OneLineMaster.Where(X => X.ParentTag == "FD" && X.IsActive == true && X.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }



        //-----------------------medicinevalues--------------------------------




        public IEnumerable<Dropdown> GetBrand()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "Brand" && x.IsActive == true && x.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetUOM()
        {
            return CMPSContext.uommaster.Where(x => x.IsDeleted == false).Select(x => new Dropdown { Text = x.Description, Value = x.Description }).OrderBy(x => x.Text).ToList();
        }



        public IEnumerable<Dropdown> GetDrugGroup(int cmpid)
        {
            return WYNKContext.DrugGroup.Where(x => x.IsDeleted == false && x.Cmpid == cmpid).Select(x => new Dropdown { Text = x.Description, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetTaxPercentage()
        {
            return CMPSContext.TaxMaster.Where(x => x.IsActive == true).Select(x => new Dropdown { Text = x.TaxDescription, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }


        public IEnumerable<Dropdown> GetDrugForm()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "Form" && x.IsActive == true && x.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetVendornames(int CMPID)
        {
            return CMPSContext.VendorMaster.Where(x => x.IsActive == true && x.CmpID == CMPID).Select(x => new Dropdown { Text = x.Name, Value = x.VendorCode.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetBrandValues(int CMPID)
        {
            return WYNKContext.DrugMaster.Where(x => x.IsActive == true && x.Cmpid == CMPID).Select(x => new Dropdown { Text = x.Brand, Values = x.ID }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> Getsuppliervalues(int id)
        {
            return CMPSContext.VendorMaster.Where(X => X.IsDeleted == false && X.IsActive == true && X.CmpID == id).Select(x => new Dropdown { Text = x.Name, Values = x.ID }).OrderBy(x => x.Text).ToList();
        }


        public IEnumerable<Dropdown> GetVendornamevalues(int Cmpid)
        {
            return CMPSContext.VendorMaster.Where(X => X.IsDeleted == false && X.IsActive == true && X.CmpID == Cmpid && X.VendorCategory != 1)

                .Select(x => new Dropdown { Text = x.Name, Values = x.ID }).OrderBy(x => x.Text).ToList();

        }


        public IEnumerable<Dropdown> GetDrugvalues(int id, int cmpid)

        {
            var I = WYNKContext.ItemVendorMapping.ToList();
            var E = WYNKContext.DrugMaster.ToList();
            var A = CMPSContext.VendorMaster.Where(x => x.ID == id && x.CmpID == cmpid).Select(u => u.VendorCode).FirstOrDefault();
            return (from s in I.Where(x => x.VendorID == A)
                    join e in E on s.ItemID equals e.ID
                    where s.IsDeleted == false && s.IsActive == true
                    select new Dropdown
                    {
                        Text = e.Brand,
                        Value = e.ID.ToString()
                    }).ToList();

        }
        public IEnumerable<Dropdown> Getlensvalues1(int VID)

        {
            return WYNKContext.Lenstrans.Select(x => new Dropdown { Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetDrugvalues1(int CompanyID)
        {
            return WYNKContext.DrugMaster.Where(x => x.IsActive == true && x.IsDeleted == false && x.Cmpid == CompanyID).Select(x => new Dropdown { Text = x.Brand.ToString(), Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }





        //-----------------------surgery--------------------------------
        public IEnumerable<Dropdown> GetSurgeryDescription()
        {
            return WYNKContext.ICDMaster.Where(x => x.IsActive == true && x.IsDeleted == false).Select(x => new Dropdown { Text = x.ICDDESCRIPTION, Value = x.ICDCODE.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetSurgeonName(int Cmpid)
        {
            return CMPSContext.DoctorMaster.Where(x => x.IsActive == true && x.CMPID == Cmpid && x.IsDeleted == false && x.RoleID == 1).Select(x => new Dropdown { Text = x.Firstname + " " + x.MiddleName + " " + x.LastName, Value = x.DoctorID.ToString() }).OrderBy(x => x.Text).ToList();

        }
        public IEnumerable<Dropdown> GetOperationTheatre(int Cmpid)
        {
            return WYNKContext.OperationTheatre.Where(x => x.IsActive == true && x.IsDeleted == false && x.CMPID == Cmpid).Select(x => new Dropdown { Text = x.OTDescription, Value = x.OTID.ToString() }).OrderBy(x => x.Text).ToList();
        }


        //public IEnumerable<Dropdown> GetAnesthetistName()
        //{
        //    return (from OLM in CMPSContext.OneLineMaster
        //            join DS in CMPSContext.DoctorSpeciality on OLM.OLMID equals DS.OLMID
        //            join DM in CMPSContext.DoctorMaster on DS.DoctorID equals DM.DoctorID
        //            where (DM.IsDeleted != true && DM.IsActive == true && OLM.OLMID == 37996)
        //            select new Dropdown
        //            {
        //                Text = DM.LastName,
        //                Value = DM.DoctorID.ToString()
        //            }).OrderBy(x => x.Text).Distinct().ToList();
        //}

        public IEnumerable<Dropdown> GetFullstoreDropdownvalues(int CompanyID)
        {

            int cmpid = CMPSContext.Company.Where(c => c.CmpID == CompanyID).Select(c => c.ParentID).FirstOrDefault();
            if (cmpid == 0)
            {
                cmpid = CompanyID;
            }

            return (from ST in CMPSContext.Storemasters.Where(x => x.IsActive == true && x.CmpID == cmpid)
                    join CM in CMPSContext.Company.Where(x => x.ParentID == cmpid || x.CmpID == cmpid)
                    on ST.CmpID equals CM.CmpID

                    select new Dropdown
                    {
                        Text = ST.Storename + "-" + CM.CompanyName,
                        Values = ST.CmpID,
                        Value = ST.StoreID.ToString()
                    }).OrderBy(x => x.Text).ToList();

        }

        public IEnumerable<Dropdown> Getdrugndgroup(int CompanyID)
        {


            return (from DG in WYNKContext.DrugMaster.Where(x => x.IsActive == true && x.IsDeleted == false && x.Cmpid == CompanyID)

                    select new Dropdown
                    {
                        Text = DG.Brand + "-" + DG.DrugGroup,
                        Value = DG.ID.ToString()
                    }).OrderBy(x => x.Text).ToList();

        }

        public IEnumerable<Dropdown> GetstoreDropdownvalues()
        {
            return CMPSContext.Storemasters.Where(x => x.IsActive == true).Select(x => new Dropdown { Text = x.Storename, Value = x.StoreID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetstoreDropdownvalues(int CompanyID, int id, string name)
        {
            var OnelineStoreID = CMPSContext.OneLineMaster.Where(x => x.ParentDescription.Replace(" ", string.Empty).Equals(name.Replace(" ", string.Empty), StringComparison.OrdinalIgnoreCase)).Select(x => x.OLMID).FirstOrDefault();
            return CMPSContext.Storemasters.Where(X => X.IsActive == true && X.CmpID == CompanyID && X.StoreID != id && X.CatgType == OnelineStoreID).Select(x => new Dropdown { Text = x.Storename, Value = x.StoreID.ToString() }).OrderBy(x => x.Text).ToList();
        }


        public IEnumerable<Dropdown> GetbranchstoreDropdownvalues(int CompanyID, string name)
        {
            var OnelineStoreID = CMPSContext.OneLineMaster.Where(x => x.ParentDescription.Replace(" ", string.Empty).Equals(name.Replace(" ", string.Empty), StringComparison.OrdinalIgnoreCase)).Select(x => x.OLMID).FirstOrDefault();

            return CMPSContext.Storemasters.Where(x => x.IsActive == true && x.CmpID == CompanyID && x.CatgType == OnelineStoreID).Select(x => new Dropdown { Text = x.Storename, Value = x.StoreID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetstoreDropdownvaluesdesc(int CompanyID, string name)
        {
            var OnelineStoreID = CMPSContext.OneLineMaster.Where(x => x.ParentDescription.Replace(" ", string.Empty).Equals(name.Replace(" ", string.Empty), StringComparison.OrdinalIgnoreCase)).Select(x => x.OLMID).FirstOrDefault();
            return CMPSContext.Storemasters.Where(x => x.IsActive == true && x.CmpID == CompanyID && x.CatgType == OnelineStoreID).Select(x => new Dropdown { Text = x.Storename, Value = x.StoreID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetBranchAll(int CompanyID)
        {

            int cmpid = CMPSContext.Company.Where(c => c.CmpID == CompanyID).Select(c => c.ParentID).FirstOrDefault();
            if (cmpid == 0)
            {
                cmpid = CompanyID;
            }

            return CMPSContext.Company.Where(x => x.CmpID == cmpid || x.ParentID == cmpid).Select(x => new Dropdown { Text = x.CompanyName, Value = x.CmpID.ToString() }).OrderBy(x => x.Text).ToList();
        }



        //public string GenerateRunningCtrlNoo1(int TransactionTypeid, int cmpid)
        //{
        //    var GRNs = CMPSContext.NumberControl.Where(x => x.TransactionID == TransactionTypeid && x.IsActive == true && x.CmpID == cmpid).OrderBy(x => x.CreatedUTC).FirstOrDefault();
        //    var GRNs1 = CMPSContext.NumberControl.Where(x => x.TransactionID == TransactionTypeid && x.IsActive == true && x.CmpID == cmpid).OrderBy(x => x.CreatedUTC).Select(x => x.RunningNumber).FirstOrDefault();
        //    if (GRNs.EffectiveTo != null)
        //    {
        //        var EffectiveTo = GRNs.EffectiveTo.Value.Date;
        //        if (EffectiveTo >= DateTime.Now.Date)
        //        {
        //            GRNs.RunningNumber = GRNs1 + 1;
        //            CMPSContext.NumberControl.UpdateRange(GRNs);

        //            ErrorLog oErrorLogstran = new ErrorLog();
        //            object namestrPF = GRNs;
        //            oErrorLogstran.WriteErrorLogArray("NumberControl", GRNs);

        //            CMPSContext.SaveChanges();
        //            return $"{GRNs.Prefix}{GRNs.RunningNumber}{GRNs.Suffix}";
        //        }
        //        else
        //        {
        //            GRNs.IsActive = false;
        //            CMPSContext.NumberControl.UpdateRange(GRNs);
        //            CMPSContext.SaveChanges();
        //            var GRNC = CMPSContext.NumberControl.Where(x => x.TransactionID == TransactionTypeid && x.CmpID == cmpid).OrderByDescending(x => x.CreatedUTC).FirstOrDefault();
        //            var GRNC1 = CMPSContext.NumberControl.Where(x => x.TransactionID == TransactionTypeid && x.CmpID == cmpid).OrderByDescending(x => x.CreatedUTC).Select(x => x.RunningNumber).FirstOrDefault();
        //            if (GRNC != null)
        //            {
        //                GRNC.IsActive = true;
        //                GRNC.RunningNumber = GRNC1 + 1;
        //                CMPSContext.NumberControl.UpdateRange(GRNC);
        //                ErrorLog oErrorLogstran = new ErrorLog();
        //                object namestrPF = GRNC;
        //                oErrorLogstran.WriteErrorLogArray("NumberControl", GRNC);
        //                CMPSContext.SaveChanges();
        //                return $"{GRNC.Prefix}{GRNC.RunningNumber}{GRNC.Suffix}";
        //            }
        //            else
        //            {
        //                return "Running Number Does'nt Exist";
        //            }
        //        }
        //    }
        //    else
        //    {
        //        var rns = CMPSContext.NumberControl.Where(x => x.TransactionID == TransactionTypeid && x.IsActive == true && x.Autonumber == true && x.CmpID == cmpid).FirstOrDefault();
        //        var rns1 = CMPSContext.NumberControl.Where(x => x.TransactionID == TransactionTypeid && x.IsActive == true && x.Autonumber == true && x.CmpID == cmpid).Select(x => x.RunningNumber).FirstOrDefault();
        //        if (rns != null)
        //        {
        //            rns.RunningNumber = rns1 + 1;
        //            CMPSContext.NumberControl.UpdateRange(rns);
        //            ErrorLog oErrorLogstran = new ErrorLog();
        //            object namestrPF = rns;
        //            oErrorLogstran.WriteErrorLogArray("NumberControl", rns);
        //            CMPSContext.SaveChanges();
        //            return $"{rns.Prefix}{rns.RunningNumber}{rns.Suffix}";
        //        }
        //        return "Running Number Does'nt Exist";
        //    }
        //}


        //public string GenerateRunningCtrlNoo(int TransactionTypeid, int CompanyID)
        //{

        //    var GRN = CMPSContext.NumberControl.Where(x => x.TransactionID == TransactionTypeid && x.IsActive == true && x.CmpID == CompanyID).OrderBy(x => x.CreatedUTC).FirstOrDefault();
        //    var GRNs1 = CMPSContext.NumberControl.Where(x => x.TransactionID == TransactionTypeid && x.IsActive == true && x.CmpID == CompanyID).OrderBy(x => x.CreatedUTC).Select(x => x.RunningNumber).FirstOrDefault();
        //    if (GRN == null)
        //    {
        //        return "Running Number Does'nt Exist";
        //    }
        //    if (GRN.EffectiveTo != null)
        //    {
        //        var EffectiveTo = GRN.EffectiveTo.Value.Date;

        //        if (EffectiveTo >= DateTime.Now.Date)
        //        {


        //            //if (updateRno == "GetRunningNo")
        //           // {
        //                var NCRN = CMPSContext.NumberControl.Where(x => x.TransactionID == TransactionTypeid && x.IsActive == true && x.Autonumber == true && x.CmpID == CompanyID).Select(x => x.RunningNumber).FirstOrDefault();
        //                return $"{GRN.Prefix}{NCRN + 1}{GRN.Suffix}";
        //            //}

        //           // else 
        //            //{
        //                GRN.RunningNumber = GRNs1 + 1;
        //                CMPSContext.NumberControl.UpdateRange(GRN);
        //                ErrorLog oErrorLogstran = new ErrorLog();
        //                object namestrPF = GRN;
        //                oErrorLogstran.WriteErrorLogArray("NumberControl", GRN);
        //                CMPSContext.SaveChanges();
        //                return $"{GRN.Prefix}{GRN.RunningNumber}{GRN.Suffix}";
        //           // }

        //            }
        //        else
        //        {
        //            GRN.IsActive = false;
        //            CMPSContext.Entry(GRN).State = EntityState.Modified;
        //            CMPSContext.SaveChanges();

        //            var GRNC = CMPSContext.NumberControl.Where(x => x.TransactionID == TransactionTypeid && x.CmpID == CompanyID).OrderByDescending(x => x.CreatedUTC).FirstOrDefault();
        //            var GRNC1 = CMPSContext.NumberControl.Where(x => x.TransactionID == TransactionTypeid && x.CmpID == CompanyID).OrderByDescending(x => x.CreatedUTC).Select(x => x.RunningNumber).FirstOrDefault();
        //            if (GRN.EffectiveTo.Value.Date < GRNC.EffectiveFrom.Date)
        //            {
        //                //if ( updateRno == "GetRunningNo")
        //               // {
        //                    GRNC.IsActive = true;
        //                    CMPSContext.Entry(GRN).State = EntityState.Modified;
        //                    CMPSContext.SaveChanges();
        //                    GRNC.RunningNumber += 1;
        //                    return $"{GRNC.Prefix}{GRNC.RunningNumber}{GRNC.Suffix}";
        //              //  }
        //              //  else
        //              //  {
        //                    GRNC.IsActive = true;
        //                    GRNC.RunningNumber = GRNC1 + 1;
        //                    CMPSContext.NumberControl.UpdateRange(GRNC);
        //                    ErrorLog oErrorLogstran = new ErrorLog();
        //                    object namestrPF = GRNC;
        //                    oErrorLogstran.WriteErrorLogArray("NumberControl", GRNC);
        //                    CMPSContext.SaveChanges();
        //                    return $"{GRNC.Prefix}{GRNC.RunningNumber}{GRNC.Suffix}";
        //              //  }

        //            }
        //            else
        //            {
        //                return "Running Number Does'nt Exist";
        //            }
        //        }
        //    }
        //    else
        //    {

        //        var rn = CMPSContext.NumberControl.Where(x => x.TransactionID == TransactionTypeid && x.IsActive == true && x.Autonumber == true && x.CmpID == CompanyID).FirstOrDefault();
        //        var NCRN = CMPSContext.NumberControl.Where(x => x.TransactionID == TransactionTypeid && x.IsActive == true && x.Autonumber == true && x.CmpID == CompanyID).Select(x => x.RunningNumber).FirstOrDefault();
        //        //if (rn != null && updateRno == "GetRunningNo")
        //       // {
        //            return $"{rn.Prefix}{NCRN + 1}{rn.Suffix}";
        //       // }

        //       // if (updateRno == "UpdateRunningNo") 
        //       // {
        //            rn.RunningNumber = NCRN + 1;
        //            CMPSContext.NumberControl.UpdateRange(rn);
        //            ErrorLog oErrorLogstran = new ErrorLog();
        //            object namestrPF = rn;
        //            oErrorLogstran.WriteErrorLogArray("NumberControl", rn);
        //            CMPSContext.SaveChanges();
        //            return $"{rn.Prefix}{rn.RunningNumber}{rn.Suffix}";
        //       // }
        //        return "Running Number Does'nt Exist";
        //    }











        //}



        public string GenerateRunningCtrlNoo(int TransactionTypeid, int CompanyID, string updateRno)
        {

            var GRN = CMPSContext.NumberControl.Where(x => x.TransactionID == TransactionTypeid && x.IsActive == true && x.CmpID == CompanyID).OrderBy(x => x.CreatedUTC).FirstOrDefault();
            var GRNs1 = CMPSContext.NumberControl.Where(x => x.TransactionID == TransactionTypeid && x.IsActive == true && x.CmpID == CompanyID).OrderBy(x => x.CreatedUTC).Select(x => x.RunningNumber).FirstOrDefault();
            if (GRN == null)
            {
                return "Running Number Does'nt Exist";
            }
            if (GRN.EffectiveTo != null)
            {
                var EffectiveTo = GRN.EffectiveTo.Value.Date;

                if (EffectiveTo >= DateTime.Now.Date)
                {


                    if (updateRno == "GetRunningNo")
                    {
                        var NCRN = CMPSContext.NumberControl.Where(x => x.TransactionID == TransactionTypeid && x.IsActive == true && x.Autonumber == true && x.CmpID == CompanyID).Select(x => x.RunningNumber).FirstOrDefault();
                        return $"{GRN.Prefix}{NCRN + 1}{GRN.Suffix}";
                    }

                    else
                    {
                        GRN.RunningNumber = GRNs1 + 1;
                        CMPSContext.NumberControl.UpdateRange(GRN);
                        ErrorLog oErrorLogstran = new ErrorLog();
                        object namestrPF = GRN;
                        oErrorLogstran.WriteErrorLogArray("NumberControl", GRN);
                        CMPSContext.SaveChanges();
                        return $"{GRN.Prefix}{GRN.RunningNumber}{GRN.Suffix}";
                    }

                }
                else
                {
                    GRN.IsActive = false;
                    CMPSContext.Entry(GRN).State = EntityState.Modified;
                    CMPSContext.SaveChanges();

                    var GRNC = CMPSContext.NumberControl.Where(x => x.TransactionID == TransactionTypeid && x.CmpID == CompanyID).OrderByDescending(x => x.CreatedUTC).FirstOrDefault();
                    var GRNC1 = CMPSContext.NumberControl.Where(x => x.TransactionID == TransactionTypeid && x.CmpID == CompanyID).OrderByDescending(x => x.CreatedUTC).Select(x => x.RunningNumber).FirstOrDefault();
                    if (GRN.EffectiveTo.Value.Date < GRNC.EffectiveFrom.Date)
                    {
                        if (updateRno == "GetRunningNo")
                        {
                            GRNC.IsActive = true;
                            CMPSContext.Entry(GRN).State = EntityState.Modified;
                            CMPSContext.SaveChanges();
                            GRNC.RunningNumber += 1;
                            return $"{GRNC.Prefix}{GRNC.RunningNumber}{GRNC.Suffix}";
                        }
                        else
                        {
                            GRNC.IsActive = true;
                            GRNC.RunningNumber = GRNC1 + 1;
                            CMPSContext.NumberControl.UpdateRange(GRNC);
                            ErrorLog oErrorLogstran = new ErrorLog();
                            object namestrPF = GRNC;
                            oErrorLogstran.WriteErrorLogArray("NumberControl", GRNC);
                            CMPSContext.SaveChanges();
                            return $"{GRNC.Prefix}{GRNC.RunningNumber}{GRNC.Suffix}";
                        }

                    }
                    else
                    {
                        return "Running Number Does'nt Exist";
                    }
                }
            }
            else
            {

                var rn = CMPSContext.NumberControl.Where(x => x.TransactionID == TransactionTypeid && x.IsActive == true && x.Autonumber == true && x.CmpID == CompanyID).FirstOrDefault();
                var NCRN = CMPSContext.NumberControl.Where(x => x.TransactionID == TransactionTypeid && x.IsActive == true && x.Autonumber == true && x.CmpID == CompanyID).Select(x => x.RunningNumber).FirstOrDefault();
                if (rn != null && updateRno == "GetRunningNo")
                {
                    return $"{rn.Prefix}{NCRN + 1}{rn.Suffix}";
                }

                if (updateRno == "UpdateRunningNo")
                {
                    rn.RunningNumber = NCRN + 1;
                    CMPSContext.NumberControl.UpdateRange(rn);
                    ErrorLog oErrorLogstran = new ErrorLog();
                    object namestrPF = rn;
                    oErrorLogstran.WriteErrorLogArray("NumberControl", rn);
                    CMPSContext.SaveChanges();
                    return $"{rn.Prefix}{rn.RunningNumber}{rn.Suffix}";
                }
                return "Running Number Does'nt Exist";
            }











        }



        public IEnumerable<Dropdown> GetDepartments()
        {
            return CMPSContext.Department.Where(x => x.IsActive == true).Select(x => new Dropdown { Text = x.Description, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetPositionofGlobe()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "POG" && x.IsActive == true && x.IsDeleted == false && x.ParentID != 0).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetGradeofThyroidEyeDisease()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "GOTED" && x.IsActive == true && x.IsDeleted == false && x.ParentID != 0).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetPalpableMassLocation()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "PML" && x.IsActive == true && x.IsDeleted == false && x.ParentID != 0).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetPalpableMassShape()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "PMShape" && x.IsActive == true && x.IsDeleted == false && x.ParentID != 0).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetPalpableMassTexture()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "PMT" && x.IsActive == true && x.IsDeleted == false && x.ParentID != 0).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetPalpableMassSize()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "PMS" && x.IsActive == true && x.IsDeleted == false && x.ParentID != 0).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }



        public IEnumerable<Dropdown> Getinvestvalues(int CmpID)
        {
            var services = CMPSContext.Services.ToList();
            var servicemaster = WYNKContext.ServiceMaster.ToList();
            var pid = CMPSContext.Services.Where(x => x.Description == "Investigation" && x.CMPID == CmpID).Select(x => x.ID).FirstOrDefault();

            //return CMPSContext.Services.Where(x => x.ParentID == pid).Select(x => new Dropdown { Text = x.Description, Value = x.ID.ToString(), Amt = x.Amount }).OrderBy(x => x.Text).ToList();

            return (from SE in services.Where(x => x.ParentID == pid)
                        //join SM in servicemaster
                        //on SE.ID equals SM.Convert.ToInt32(ChildDescription)

                    select new Dropdown
                    {
                        Text = SE.Description,
                        Value = SE.ID.ToString(),
                        Amt = servicemaster.Where(x => x.ChildDescription == Convert.ToString(SE.ID)).Select(x => x.TotalAmount).FirstOrDefault(),

                    }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> Geteyeerrvalues()
        {

            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "SQTYPE" && x.IsActive == true && x.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString(), Amt = x.Amount }).OrderBy(x => x.Text).ToList();
        }


        public IEnumerable<Dropdown> GetInvDep(int CmpID)
        {

            //return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "INV" && x.IsActive == true).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString(), Amt = x.Amount }).OrderBy(x => x.Text).ToList();

            var services = CMPSContext.Services.ToList();
            var servicemaster = WYNKContext.ServiceMaster.ToList();
            var pid = CMPSContext.Services.Where(x => x.Description == "Investigation" && x.CMPID == CmpID).Select(x => x.ID).FirstOrDefault();

            return (from SE in services.Where(x => x.ParentID == pid)


                    select new Dropdown
                    {
                        Text = SE.Description,
                        Value = SE.ID.ToString(),
                        Amt = servicemaster.Where(x => x.ChildDescription == Convert.ToString(SE.ID)).Select(x => x.TotalAmount).FirstOrDefault(),

                    }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetTab()
        {


            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "services" && x.IsActive == true).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString(), Amt = x.Amount }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> Gettaxvalues()
        {
            return CMPSContext.TaxMaster.Select(x => new Dropdown { Taxx = x.GSTPercentage, Value = x.ID.ToString() }).OrderBy(x => x.Taxx).ToList();
        }

        public IEnumerable<Dropdown> GetRevnueValues()
        {
            return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "Services").Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> Getlocationvalues(int LID)
        {

            var ID = CMPSContext.LocationMaster.Where(x => x.ID == LID && x.ParentTag == "loc").Select(f => f.ParentID).FirstOrDefault();

            if (ID != null)
            {
                return CMPSContext.LocationMaster.Where(x => x.ParentID == ID && x.IsActive == true).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
            }
            else
            {
                return CMPSContext.LocationMaster.Where(x => x.ParentID == LID && x.IsActive == true).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
            }


        }

        public IEnumerable<Dropdown> Getuniversity()
        {
            return WYNKContext.University.Where(x => x.IsActive == true).Select(x => new Dropdown { Text = x.UniversityDescription, Value = x.UniversityCode.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> Getqualification()
        {
            return WYNKContext.Qualification.Where(x => x.IsActive == true).Select(x => new Dropdown { Text = x.Description, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> Getlocationcityvalues()
        {
            return CMPSContext.LocationMaster.Where(x => x.ParentTag == "City" && x.IsActive == true).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetDrug(string Grn, int StoreID, int CompanyID)
        {
            var M_StockMas = WYNKContext.StockMaster.ToList();
            var M_StockMasTran = WYNKContext.StockTran.ToList();
            var M_DrugMaster = WYNKContext.DrugMaster.ToList();
            var ItemBatchs = WYNKContext.ItemBatch.ToList();
            var itmtran = WYNKContext.ItemBatchTrans.ToList();

            return (from SM in M_StockMas.Where(x => x.DocumentNumber == Grn && x.StoreID == StoreID && x.CMPID == CompanyID)
                    join SMT in M_StockMasTran
                    on SM.RandomUniqueID equals SMT.SMID
                    join DM in M_DrugMaster
                    on SMT.ItemID equals DM.ID
                    select new Dropdown
                    {
                        Drugname = DM.Brand,

                    }).ToList();
        }
        public IEnumerable<Dropdown> Getdoctornamedetails(int CompanyID)

        {
            return (from DM in CMPSContext.DoctorMaster
                    where (DM.IsDeleted == false && DM.CMPID == CompanyID && DM.IsActive == true)
                    select new Dropdown
                    {
                        Text = DM.Firstname + ' ' + DM.MiddleName + ' ' + DM.LastName,
                        Values = DM.DoctorID,
                        Value = DM.Firstname + ' ' + DM.MiddleName + ' ' + DM.LastName,
                    }).ToList();
        }
        public IEnumerable<Dropdown> Getdoctornamevalues(int CompanyID)
        {
            var olmid = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == "Optometrist" && x.ParentTag == "ST").Select(x => x.OLMID).FirstOrDefault();
            return (from OLM in CMPSContext.OneLineMaster
                    join DS in CMPSContext.DoctorSpeciality on OLM.OLMID equals DS.OLMID
                    join DM in CMPSContext.DoctorMaster on DS.DoctorID equals DM.DoctorID
                    //join us in CMPSContext.Users on DM.EmailID equals us.Username
                    where (DM.IsDeleted != true && OLM.OLMID == olmid && DM.CMPID == CompanyID && DM.IsActive == true)
                    select new Dropdown
                    {
                        Text = DM.Firstname + ' ' + DM.MiddleName + ' ' + DM.LastName,
                        Value = DM.DoctorID.ToString(),
                    }).OrderBy(x => x.Text).Distinct().ToList();

        }

        public IEnumerable<Dropdown> GetEyedoctornamevalues(int CompanyID)
        {
            var olmid = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == "EYE" && x.ParentTag == "ST").Select(x => x.OLMID).FirstOrDefault();

            var data = new AppointmentView();
            return (from OLM in CMPSContext.OneLineMaster
                        //  end of changes
                    join DS in CMPSContext.DoctorSpeciality on OLM.OLMID equals DS.OLMID
                    join DM in CMPSContext.DoctorMaster on DS.DoctorID equals DM.DoctorID
                    //join us in CMPSContext.Users on DM.EmailID equals us.Username
                    where (DM.IsDeleted != true && OLM.OLMID == olmid && DM.CMPID == CompanyID && DM.IsActive == true)
                    select new Dropdown
                    {
                        Text = DM.Firstname + ' ' + DM.MiddleName + ' ' + DM.LastName,
                        Value = DM.DoctorID.ToString(),
                    }).OrderBy(x => x.Text).Distinct().ToList();
        }


        //public IEnumerable<Dropdown> Getvisiondoctornamevalues(int CompanyID)
        //{
        //    var olmid = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == "Vision care" && x.ParentTag == "ST").Select(x => x.OLMID).FirstOrDefault();
        //    return (from OLM in CMPSContext.OneLineMaster
        //                //  end of changes
        //            join DS in CMPSContext.DoctorSpeciality on OLM.OLMID equals DS.OLMID
        //            join DM in CMPSContext.DoctorMaster on DS.DoctorID equals DM.DoctorID
        //            //join us in CMPSContext.Users on DM.EmailID equals us.Username
        //            where (DM.IsDeleted != true && OLM.OLMID == olmid && DM.CMPID == CompanyID && DM.IsActive == true)
        //            select new Dropdown
        //            {
        //                Text = DM.Firstname + ' ' + DM.MiddleName + ' ' + DM.LastName,
        //                Value = DM.DoctorID.ToString()
        //            }).OrderBy(x => x.Text).Distinct().ToList();
        //}
        public dynamic Getvisiondoctornamevalues(int CompanyID)
        {
            var olmid = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == "Optometrist" && x.ParentTag == "ST").Select(x => x.OLMID).FirstOrDefault();

            var Commonlist = new RegistrationDataViewModel();
            Commonlist.EyedoctorCommonlistmodel = new List<Commonlistmodel>();
            Commonlist.visionCommonlistmodel = new List<Commonlistmodel>();
            Commonlist.OptoCommonlistmodel = new List<Commonlistmodel>();

            Commonlist.OptoCommonlistmodel = (from OLM in CMPSContext.OneLineMaster
                                              join DS in CMPSContext.DoctorSpeciality on OLM.OLMID equals DS.OLMID
                                              join DM in CMPSContext.DoctorMaster on DS.DoctorID equals DM.DoctorID
                                              //join us in CMPSContext.Users on DM.EmailID equals us.Username
                                              where (DM.IsDeleted != true && OLM.OLMID == olmid && DM.CMPID == CompanyID && DM.IsActive == true)
                                              select new Commonlistmodel
                                              {
                                                  Text = DM.Firstname + ' ' + DM.MiddleName + ' ' + DM.LastName,
                                                  Value = DM.DoctorID.ToString(),
                                              }).OrderBy(x => x.Text).Distinct().ToList();
            var dolmid = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == "EYE" && x.ParentTag == "ST").Select(x => x.OLMID).FirstOrDefault();
            Commonlist.EyedoctorCommonlistmodel = (from OLM in CMPSContext.OneLineMaster
                                                   join DS in CMPSContext.DoctorSpeciality on OLM.OLMID equals DS.OLMID
                                                   join DM in CMPSContext.DoctorMaster on DS.DoctorID equals DM.DoctorID
                                                   //join us in CMPSContext.Users on DM.EmailID equals us.Username
                                                   where (DM.IsDeleted != true && OLM.OLMID == dolmid && DM.CMPID == CompanyID && DM.IsActive == true)
                                                   select new Commonlistmodel
                                                   {
                                                       Text = DM.Firstname + ' ' + DM.MiddleName + ' ' + DM.LastName,
                                                       Value = DM.DoctorID.ToString(),
                                                   }).OrderBy(x => x.Text).Distinct().ToList();
            var volmid = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == "Vision care" && x.ParentTag == "ST").Select(x => x.OLMID).FirstOrDefault();
            Commonlist.visionCommonlistmodel = (from OLM in CMPSContext.OneLineMaster
                                                join DS in CMPSContext.DoctorSpeciality on OLM.OLMID equals DS.OLMID
                                                join DM in CMPSContext.DoctorMaster on DS.DoctorID equals DM.DoctorID
                                                //join us in CMPSContext.Users on DM.EmailID equals us.Username
                                                where (DM.IsDeleted != true && OLM.OLMID == volmid && DM.CMPID == CompanyID && DM.IsActive == true)
                                                select new Commonlistmodel
                                                {
                                                    Text = DM.Firstname + ' ' + DM.MiddleName + ' ' + DM.LastName,
                                                    Value = DM.DoctorID.ToString(),
                                                }).OrderBy(x => x.Text).Distinct().ToList();

            //public IEnumerable<Dropdown> GetViewvalues()
            //{
            //    return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "RegStatus" && x.IsActive == true).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
            //}
            Commonlist.ViewCommonlistmodel = (from OLM in CMPSContext.OneLineMaster
                                              where (OLM.ParentTag == "RegStatus" && OLM.IsActive == true)

                                              select new Commonlistmodel
                                              {
                                                  Text = OLM.ParentDescription,
                                                  Value = OLM.OLMID.ToString(),
                                              }).OrderBy(x => x.Text).Distinct().ToList();
            return Commonlist;


        }







        //public string GenerateRunningCtrlNoo(string rncontrolcode)
        //{
        //    var GRN = CMPSContext.NumberControl.Where(x => x.Description == rncontrolcode && x.IsActive == true).OrderBy(x => x.CreatedUTC).FirstOrDefault();
        //    if (GRN.EffectiveTo == null)
        //    {
        //        GRN.EffectiveTo = DateTime.Now.Date;
        //    }
        //    var EffectiveTo = GRN.EffectiveTo.Value.Date.AddDays(1);
        //    if (DateTime.Now.Date == EffectiveTo)
        //    {
        //        GRN.IsActive = false;
        //        CMPSContext.Entry(GRN).State = EntityState.Modified;
        //        CMPSContext.SaveChanges();
        //        var GRNC = CMPSContext.NumberControl.Where(x => x.Description == rncontrolcode).OrderByDescending(x => x.CreatedUTC).FirstOrDefault();
        //        if (GRN.EffectiveTo.Value.Date < GRNC.EffectiveFrom.Date)
        //        {
        //            GRNC.IsActive = true;
        //            CMPSContext.Entry(GRN).State = EntityState.Modified;
        //            CMPSContext.SaveChanges();
        //        }
        //    }
        //    var rn = CMPSContext.NumberControl.Where(x => x.Description == rncontrolcode && x.IsActive == true && x.Autonumber == true).FirstOrDefault();
        //    if (rn != null)
        //    {
        //        rn.RunningNumber += 1;
        //        CMPSContext.Entry(rn).State = EntityState.Modified;
        //        CMPSContext.SaveChanges();
        //        return $"{rn.Prefix}{rn.RunningNumber}{rn.Suffix}";
        //    }
        //    else
        //    {
        //        var GRNCR = "Running Number Does'nt Exist";

        //        return GRNCR;
        //    }
        //}

        public IEnumerable<Dropdown> Geticdspecvalues()//Geticddescvalues
        {
            return WYNKContext.ICDSpecialityCode.Where(X => X.IsActive == true).Select(x => new Dropdown { Text = x.SpecialityDescription, Values = x.ID }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> Geticddescvalues(int id)//Getsuppliervalues
        {
            return WYNKContext.ICDMaster.Where(X => X.IsDeleted == false && X.IsActive == true && X.SpecialityCode == id).Select(x => new Dropdown { Text = x.ICDDESCRIPTION, Value = x.ICDCODE }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> Geticicddescvalues(int id)//Getsuppliervalues
        {
            var speciality = WYNKContext.SpecialityVSTest.ToList();
            var oneline = CMPSContext.Services.ToList();
            var icdcode = WYNKContext.ICDSpecialityCode.ToList();

            var icdspec = (from sp in speciality.Where(X => X.IsDeleted == false && X.IsActive == true && X.SpecialityID == id)
                           join olm in oneline on sp.InvestigationID equals olm.ID
                           select new Dropdown
                           {
                               Text = olm.Description,
                               Value = sp.InvestigationID.ToString(),
                               Drugname = icdcode.Where(x => x.ID == sp.SpecialityID).Select(x => x.SpecialityDescription).FirstOrDefault(),
                           }).ToList();
            return icdspec;



        }

        public IEnumerable<Dropdown> Getoptmodelvalues(int id)//Getsuppliervalues
        {
            return WYNKContext.Lenstrans.Where(X => X.Brand == id).Select(x => new Dropdown { Text = x.Model, Values = x.ID }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetBRModuleDescription(int CompanyID)
        {
            return CMPSContext.ModuleMaster.Where(x => x.IsActive == true).Select(x => new Dropdown { Text = x.ModuleDescription, Value = Convert.ToString(x.ModuleID) }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetICDSpecialityDescription()
        {
            return WYNKContext.ICDSpecialityCode.Where(x => x.IsActive == true).Select(x => new Dropdown { Text = x.SpecialityDescription, Value = Convert.ToString(x.ID) }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> Getsqutreat(int id)//Getsuppliervalues
        {
            return WYNKContext.TreatmentMaster.Where(X => X.IsDeleted == false && X.IsActive == true && X.ICD_SPECIALITY_ID == id).Select(x => new Dropdown { Text = x.TreatmentDescription, Values = x.ID }).OrderBy(x => x.Text).ToList();
        }
        //////////////////////////////////////////////////////////////////////////////////////Yours
        public IEnumerable<Dropdown> GstSearch()
        {
            return CMPSContext.TaxMaster.Where(x => x.IsActive == true).Select(x => new Dropdown { Text = x.TaxDescription.ToString(), Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();

        }

        public IEnumerable<Dropdown> CessSearch(int ID)
        {
            return CMPSContext.TaxMaster.Where(x => x.IsActive == true && x.ID == ID).Select(x => new Dropdown { Text = x.CESSPercentage.ToString(), Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();

        }


        public IEnumerable<Dropdown> GSTperSearch(int ID)
        {
            return CMPSContext.TaxMaster.Where(x => x.IsActive == true && x.ID == ID).Select(x => new Dropdown { Text = x.GSTPercentage.ToString(), Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();

        }

        public IEnumerable<Dropdown> UOMSearch()
        {
            return CMPSContext.uommaster.Where(x => x.Description == "Pieces").Select(x => new Dropdown { Text = x.Description.ToString(), Value = x.id.ToString() }).OrderBy(x => x.Text).ToList();

        }


        public IEnumerable<Dropdown> AddCessSearch(int ID)
        {
            return CMPSContext.TaxMaster.Where(x => x.IsActive == true && x.ID == ID).Select(x => new Dropdown { Text = x.AdditionalCESSPercentage.ToString(), Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();

        }

        public IEnumerable<Dropdown> GetBrandLens(int cmpid)
        {
            return WYNKContext.Brand.Where(x => x.BrandType == "Lens" && x.IsActive == true && x.IsDeleted == false && x.cmpID == cmpid).Select(x => new Dropdown { Text = x.Description.ToString(), Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();

        }

        public IEnumerable<Dropdown> GetBrandContactLens(int cmpid)
        {
            return WYNKContext.Brand.Where(x => x.BrandType == "Contactlens" && x.IsActive == true && x.IsDeleted == false && x.cmpID == cmpid).Select(x => new Dropdown { Text = x.Description.ToString(), Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();

        }

        public IEnumerable<Dropdown> GetBrandFrame(int cmpid)
        {
            return WYNKContext.Brand.Where(x => x.BrandType == "Frame" && x.IsActive == true && x.IsDeleted == false && x.cmpID == cmpid).Select(x => new Dropdown { Text = x.Description.ToString(), Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();

        }

        public IEnumerable<Dropdown> GetSplName()
        {
            return WYNKContext.ICDSpecialityCode.Where(x => x.IsActive == true).Select(x => new Dropdown { Text = x.SpecialityDescription.ToString(), Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();

        }

        public IEnumerable<Dropdown> GetSquintvalue()
        {
            return WYNKContext.ICDSpecialityCode.Where(x => x.IsActive == true && x.SpecialityDescription == "SQUINT").Select(x => new Dropdown { Text = x.SpecialityDescription, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public dynamic print(string PAID)
        {
            var pay = WYNKContext.PaymentMaster.ToList().Where(x => x.Paid.ToString() == PAID).OrderByDescending(x => x.CreatedUTC).Take(1).ToList();
            var reg = WYNKContext.Registration.ToList();
            //var GenerateReceiptNumber = GenerateRunningCtrlNo(7014);
            var pad = WYNKContext.PatientAccountDetail.ToList();
            var recpno = new commonreceipt();
            recpno.getrecpp = (from pa in pay
                               join REG in reg
                               on pa.UIN equals REG.UIN
                               //join PAD in pad
                               //on pa.PAID equals PAD.PAID
                               select new getrecp
                               {
                                   // description = pad.Where(x => x.PAID == pa.PAID).Select(x => x.ServiceDescription).FirstOrDefault(),
                                   UIN = pa.UIN,
                                   PaymentModee = pa.PaymentMode,
                                   InstrumentNumberr = pa.InstrumentNumber,
                                   Instrumentdatee = pa.Instrumentdate,
                                   BankNamee = pa.BankName,
                                   BankBranchh = pa.BankBranch,
                                   Amountt = pa.Amount,
                                   name = REG.Name,
                                   phone = REG.Phone,
                                   date1 = pa.CreatedUTC,
                               }).ToList();


            return recpno;

        }
        public IEnumerable<Dropdown> GetRooms(int CMPID)
        {
            var one = CMPSContext.OneLineMaster.ToList();
            var Room = WYNKContext.Room.ToList();
            var RoomTypes = (from onl in Room.Where(x => x.IsActive == true && x.CMPID == CMPID)
                             join rom in one on onl.RoomType equals rom.OLMID.ToString()
                             select new Dropdown
                             {
                                 Text = rom.ParentDescription,
                                 Value = rom.OLMID.ToString(),
                             }).OrderBy(x => x.Text).ToList();

            return RoomTypes;
            //return CMPSContext.OneLineMaster.Where(x => x.ParentTag == "RoomType" && x.ParentID !=0 ).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetSurgeryLens(int CMPID)
        {


            var Druglens = (from dm in WYNKContext.DrugMaster.Where(x => x.IsActive == true && x.DrugCategory == 1 && x.Cmpid == CMPID)
                            join dg in WYNKContext.DrugGroup on dm.GenericName equals dg.ID
                            select new Dropdown
                            {
                                Text = dg.Description,
                                Value = dg.ID.ToString(),
                            }).ToList();
            return Druglens;
        }
        public IEnumerable<Dropdown> GetRoomstatus()
        {
            return CMPSContext.OneLineMaster.Where(x => x.IsActive == true && x.ParentTag == "RoomStatus").Select(x => new Dropdown { Text = x.ParentDescription.ToString(), Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        /// <summary>
        /// /// Indent Details
        /// 

        public IEnumerable<Dropdown> GetIndentSurgeonDetails()
        {

            var Dm = CMPSContext.DoctorMaster.ToList();
            var STAm = WYNKContext.SurgeryAssignedTran.ToList();

            return (from SAT in STAm
                    join DM in Dm on SAT.DoctorID equals DM.DoctorID
                    where DM.IsActive == true
                    select new Dropdown
                    {
                        Text = DM.LastName,
                        Value = DM.DoctorID.ToString()
                    }).OrderBy(x => x.Text).Distinct().ToList();

        }
        public IEnumerable<Dropdown> GetIndentOTDetails()
        {
            return WYNKContext.OperationTheatre.Where(x => x.IsActive == true).Select(x => new Dropdown { Text = x.OTDescription.ToString(), Value = x.OTID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetIndentDrugDetails()
        {
            return WYNKContext.DrugMaster.Where(x => x.IsActive == true).Select(x => new Dropdown { Text = x.Brand.ToString(), Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetIndentUOMDetails()
        {
            return CMPSContext.uommaster.Select(x => new Dropdown { Text = x.Description.ToString(), Value = x.id.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetAllModels()
        {
            return WYNKContext.Lenstrans.Select(x => new Dropdown { Text = x.Model.ToString(), Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> GetBrands()
        {
            return WYNKContext.Brand.Select(x => new Dropdown { Text = x.Description.ToString(), Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> SSCTypeDetails()
        {
            return CMPSContext.OneLineMaster.Where(x => x.IsActive == true && x.ParentTag == "SSCType").Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();

        }

        public IEnumerable<Dropdown> GetBrandAll(int CompanyID)
        {
            return WYNKContext.Brand.Where(x => x.IsActive == true && x.IsDeleted == false && x.cmpID == CompanyID).Select(x => new Dropdown { Text = x.Description.ToString(), Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetBrandAllDrugs()
        {


            return WYNKContext.DrugMaster.Where(x => x.IsActive == true && x.IsDeleted == false).Select(x => new Dropdown { Text = x.Brand.ToString(), Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }


        public IEnumerable<Dropdown> GetBrands1()
        {
            var Optical = WYNKContext.OpticalBalance.ToList();
            var LensTran = WYNKContext.Lenstrans.ToList();
            var Brand = WYNKContext.Brand.ToList();
            return (from LT in LensTran
                    join BD in Brand on LT.Brand equals BD.ID
                    select new Dropdown
                    {
                        Text = BD.Description,
                        Values = BD.ID

                    }).OrderBy(x => x.Text).Distinct().ToList();
        }
        //public IEnumerable<Dropdown> GetDoctorSpecialitydetails(int DID, int CMPID)
        //{
        //    var DocM = CMPSContext.DoctorMaster.Where(x=>x.CMPID==CMPID).ToList();
        //    var DocS = CMPSContext.DoctorSpeciality.ToList();
        //    var OLM = CMPSContext.OneLineMaster.ToList();

        //    return (from DM in DocM 
        //            where DM.DoctorID == DID
        //            //join BD in Brand on LT.Brand equals BD.ID
        //            select new Dropdown
        //            {
        //                Text = OLM.Where(x=>x.OLMID == DocS.Where(f => f.DoctorID == DID).Select(g => g.OLMID).FirstOrDefault()).Select(c=>c.ParentDescription).FirstOrDefault(),
        //                Values = DM.DoctorID

        //            }).ToList();
        //}

        public dynamic getConcerntextfile(int CompanyID)
        {
            var Registrationmaster = new ConcentUploadingViewModel();
            //Registrationmaster.PatientAssignStatus = new List<PatientAssignStatus>();
            string[] lines;
            var list = new List<string>();
            var osfi = CompanyID;
            var osfn = "Registration.txt";
            var currentDir = Directory.GetCurrentDirectory();
            string path = currentDir + "/ConcernPages/" + osfi + '/' + osfn;

            if (File.Exists(path))
            {
                var fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
                using (var streamReader = new StreamReader(fileStream, Encoding.UTF8))
                {
                    string line;
                    while ((line = streamReader.ReadLine()) != null)
                    {
                        list.Add(line);
                    }
                }
                lines = list.ToArray();
                Registrationmaster.TOtalLines = lines;
            }
            else
            {
                Registrationmaster.ErrorMessaGE = "No Concern";
            }

            return Registrationmaster;
        }

        public IEnumerable<Dropdown> GetRoomtypes()
        {
            return WYNKContext.Room.Where(x => x.IsActive == true).Select(x => new Dropdown { Text = x.RoomType.ToString() }).OrderBy(x => x.Text).ToList();

        }

        public IEnumerable<Dropdown> Getcountryvalues()
        {
            return CMPSContext.Country.Select(x => new Dropdown { Text = x.CountryName.ToString(), Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();

        }


        public IEnumerable<Dropdown> GetComplainrdetailsvalues()
        {
            return CMPSContext.OneLineMaster.Where(x => x.IsActive == true && x.ParentTag == "ApptComplaint" && x.IsDeleted == false).Select(x => new Dropdown { Text = x.ParentDescription.ToString(), Value = x.OLMID.ToString() }).OrderBy(x => x.Text).ToList();

        }


        public IEnumerable<Dropdown> GetOrgnizations()
        {
            return WYNKContext.CAMPORGANIZATION.Where(x => x.IsActive == true).Select(x => new Dropdown { Text = x.OrganizationName.ToString(), Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();

        }



        //////////////currency/////////////////////////////
        public IEnumerable<Dropdown> GetCurrencyvalues(int CMPID)
        {


            var Setup = CMPSContext.Setup.ToList();
            var Country = CMPSContext.Country.ToList();
            var CountryID = Setup.Where(x => x.CMPID == CMPID).Select(x => x.Country).FirstOrDefault();

            return CMPSContext.Country.Where(x => x.ID == Convert.ToInt32(CountryID)).Select(x => new Dropdown { Text = x.CountryCode, Value = x.Currency }).OrderBy(x => x.Text).ToList();
        }
        public IEnumerable<Dropdown> Getsetupregvalues(int CMPID)
        {


            var Setup = CMPSContext.Setup.Where(x => x.CMPID == CMPID).ToList();


            return Setup.Where(x => x.CMPID == CMPID).Select(x => new Dropdown { Registrationfeeapplicable = x.Registrationfeeapplicable, Insuranceapplicable = x.Insuranceapplicable }).ToList();
        }
        public int? GettingReceiptTcID(int TC, int CompanyID)
        {
            var ReceiptID = CMPSContext.TransactionType.Where(x => x.TransactionID == TC).Select(x => x.RecPayContra).FirstOrDefault();

            if (ReceiptID != null)
                return ReceiptID;

            return null;
        }

        public dynamic Getlogdetails(int cmpid, string user, string path)
        {
            try
            {
                var UserID = CMPSContext.Role.Where(x => x.RoleDescription == user).Select(x => x.RoleID).FirstOrDefault();
                var companyname = CMPSContext.Company.Where(x => x.CmpID == cmpid).Select(x => x.CompanyName).FirstOrDefault();
                TextWriter txt = new StreamWriter("D:\\Un-AuthorizedLogger.txt");
                txt.Write("Organization : " + companyname + "  - " + "   Log Created  Date and Time " + ':' + DateTime.UtcNow + "\n" + "\n");
                txt.Write("Un-Authorized Access done by  " + ": " + user + "\n");
                txt.Write("Created Date and Time " + ": " + DateTime.UtcNow + "\n");
                txt.Write("Module Trying to Access" + ": " + path + "\n");
                txt.Close();
                ErrorLog oErrorLogs = new ErrorLog();
                oErrorLogs.WriteErrorLogTitle(companyname, "Un-Authorized Access done by", "User name :", user, "User ID :", Convert.ToString(UserID), "Mode : URL");
                ErrorLog oErrorLog = new ErrorLog();
                oErrorLog.WriteErrorLog("Module Trying to Access :", path);
                oErrorLog.WriteErrorLog("Error : Un-Authorized Access on", path);
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,
                Message = "Something Went Wrong"
            };


        }


        public dynamic GetAccessdetails(int cmpid, string user, string path)
        {

            // var roleaccessdetails = new RegistrationMasterI();
            var AccessPrivilegesDetailss = new RegistrationMasterViewModel();
            AccessPrivilegesDetailss.GetAvccessDetails = new List<GetAvccessDetails>();
            var roleid = CMPSContext.Users.Where(x => x.Userid == Convert.ToInt32(user)).Select(x => x.ReferenceID).FirstOrDefault();
            var moduleid = CMPSContext.ModuleMaster.Where(x => x.Parentmoduledescription == path).Select(x => x.ModuleID).FirstOrDefault();
            var Moduledesc = CMPSContext.ModuleMaster.Where(x => x.ModuleID == moduleid).Select(x => x.ModuleDescription).FirstOrDefault();
            if (Moduledesc == "Findings")
            {
                var modueild = CMPSContext.ModuleMaster.Where(x => x.ModuleType == "Findings-Main").Select(x => x.ModuleID).FirstOrDefault();
                var Findingslist = CMPSContext.RoleVsModule.Where(x => x.CmpID == cmpid && x.RoleID == roleid && x.ParentModuleID == modueild).ToList();
                AccessPrivilegesDetailss.WorkflowDataOriginalmainModule = (from gf in CMPSContext.ModuleMaster.Where(x => x.ModuleType == "Findings-Main")
                                                                           select new WorkflowDataOriginalmainModule()
                                                                           {
                                                                               MainDescription = gf.ModuleDescription,
                                                                               workflowDataOriginalsubModule = (from s in CMPSContext.ModuleMaster.Where(x => x.ParentModuleid == gf.ModuleID)
                                                                                                                select new workflowDataOriginalsubModule()
                                                                                                                {
                                                                                                                    subDescription = s.ModuleDescription,
                                                                                                                    Moduletypes = s.ModuleType,
                                                                                                                    Parentmoduledescription = CMPSContext.ModuleMaster.Where(x => x.ModuleID == s.ModuleID).Select(x => x.Parentmoduledescription).FirstOrDefault(),
                                                                                                                    All = CMPSContext.RoleVsModule.Where(x => x.ModuleID == s.ModuleID && x.CmpID == cmpid && x.RoleID == roleid).Select(x => x.All).FirstOrDefault(),
                                                                                                                    Add = CMPSContext.RoleVsModule.Where(x => x.ModuleID == s.ModuleID && x.CmpID == cmpid && x.RoleID == roleid).Select(x => x.Add).FirstOrDefault(),
                                                                                                                    Edit = CMPSContext.RoleVsModule.Where(x => x.ModuleID == s.ModuleID && x.CmpID == cmpid && x.RoleID == roleid).Select(x => x.Edit).FirstOrDefault(),
                                                                                                                    Update = CMPSContext.RoleVsModule.Where(x => x.ModuleID == s.ModuleID && x.CmpID == cmpid && x.RoleID == roleid).Select(x => x.Query).FirstOrDefault(),
                                                                                                                    Export = CMPSContext.RoleVsModule.Where(x => x.ModuleID == s.ModuleID && x.CmpID == cmpid && x.RoleID == roleid).Select(x => x.Print).FirstOrDefault(),
                                                                                                                    Delete = CMPSContext.RoleVsModule.Where(x => x.ModuleID == s.ModuleID && x.CmpID == cmpid && x.RoleID == roleid).Select(x => x.Delete).FirstOrDefault(),
                                                                                                                    TransactionID = CMPSContext.ModuleMaster.Where(x => x.ModuleID == s.ModuleID).Select(x => x.TransactionTypeID).FirstOrDefault(),
                                                                                                                    workflowFgformsModule = (from a in CMPSContext.ModuleMaster.Where(x => x.ParentModuleid == s.ModuleID)
                                                                                                                                             select new workflowFgformsModule()
                                                                                                                                             {
                                                                                                                                                 formDescription = a.ModuleDescription,
                                                                                                                                                 Moduletypes = a.ModuleType,
                                                                                                                                                 All = CMPSContext.RoleVsModule.Where(x => x.ModuleID == a.ModuleID && x.CmpID == cmpid && x.RoleID == roleid).Select(x => x.All).FirstOrDefault(),
                                                                                                                                                 Add = CMPSContext.RoleVsModule.Where(x => x.ModuleID == a.ModuleID && x.CmpID == cmpid && x.RoleID == roleid).Select(x => x.Add).FirstOrDefault(),
                                                                                                                                                 Edit = CMPSContext.RoleVsModule.Where(x => x.ModuleID == a.ModuleID && x.CmpID == cmpid && x.RoleID == roleid).Select(x => x.Edit).FirstOrDefault(),
                                                                                                                                                 Update = CMPSContext.RoleVsModule.Where(x => x.ModuleID == a.ModuleID && x.CmpID == cmpid && x.RoleID == roleid).Select(x => x.Query).FirstOrDefault(),
                                                                                                                                                 Export = CMPSContext.RoleVsModule.Where(x => x.ModuleID == a.ModuleID && x.CmpID == cmpid && x.RoleID == roleid).Select(x => x.Print).FirstOrDefault(),
                                                                                                                                                 Delete = CMPSContext.RoleVsModule.Where(x => x.ModuleID == a.ModuleID && x.CmpID == cmpid && x.RoleID == roleid).Select(x => x.Delete).FirstOrDefault(),
                                                                                                                                             }).ToList(),
                                                                                                                }).ToList(),
                                                                           }).ToList();


                var listdetails = CMPSContext.RoleVsModule.OrderByDescending(x => x.CreatedUTC).Where(x => x.CmpID == cmpid && x.ModuleID == moduleid && x.RoleID == roleid).FirstOrDefault();
                var Data = new GetAvccessDetails();
                if (listdetails != null)
                {
                    if (listdetails.All == true)
                    {
                        Data.Add = true;
                        Data.Edit = true;
                        Data.Delete = true;
                        Data.Export = true;
                        Data.Print = true;
                        AccessPrivilegesDetailss.GetAvccessDetails.Add(Data);
                    }
                    else
                    {
                        Data.Add = listdetails.Add;
                        Data.Edit = listdetails.Edit;
                        Data.Delete = listdetails.Delete;
                        Data.Export = listdetails.Query;
                        Data.Print = listdetails.Print;
                        AccessPrivilegesDetailss.GetAvccessDetails.Add(Data);
                    }
                }
            }
            else
            {
                var listdetails = CMPSContext.RoleVsModule.OrderByDescending(x => x.CreatedUTC).Where(x => x.CmpID == cmpid && x.ModuleID == moduleid && x.RoleID == roleid).FirstOrDefault();
                var Data = new GetAvccessDetails();
                if (listdetails != null)
                {
                    if (listdetails.All == true)
                    {
                        Data.Add = true;
                        Data.Edit = true;
                        Data.Delete = true;
                        Data.Export = true;
                        Data.Print = true;
                        AccessPrivilegesDetailss.GetAvccessDetails.Add(Data);
                    }
                    else
                    {
                        Data.Add = listdetails.Add;
                        Data.Edit = listdetails.Edit;
                        Data.Delete = listdetails.Delete;
                        Data.Export = listdetails.Query;
                        Data.Print = listdetails.Print;
                        AccessPrivilegesDetailss.GetAvccessDetails.Add(Data);
                    }
                }
            }

            return AccessPrivilegesDetailss;
        }



        public dynamic GetAccessdetailsstring(int cmpid, string user, string path, string suffix)
        {

            var roleaccessdetails = new RegistrationMasterI();
            var dd = path + '/' + suffix;

            roleaccessdetails.GetAvccessDetails = new List<GetAvccessDetails>();
            roleaccessdetails.AlternativeDrug = new List<AlternativeDrug>();
            var roleid = CMPSContext.Users.Where(x => x.Userid == Convert.ToInt32(user)).Select(x => x.ReferenceID).FirstOrDefault();
            var moduleid = CMPSContext.ModuleMaster.Where(x => x.Parentmoduledescription == dd).Select(x => x.ModuleID).FirstOrDefault();
            var listdetails = CMPSContext.RoleVsModule.OrderByDescending(x => x.CreatedUTC).Where(x => x.CmpID == cmpid && x.ModuleID == moduleid && x.RoleID == roleid).FirstOrDefault();

            var Data = new GetAvccessDetails();

            if (listdetails != null)
            {

                if (listdetails.All == true)
                {
                    Data.Add = true;
                    Data.Edit = true;
                    Data.Delete = true;
                    Data.Export = true;
                    Data.Print = true;
                    roleaccessdetails.GetAvccessDetails.Add(Data);
                }
                else
                {
                    Data.Add = listdetails.Add;
                    Data.Edit = listdetails.Edit;
                    Data.Delete = listdetails.Delete;
                    Data.Export = listdetails.Query;
                    Data.Print = listdetails.Print;
                    roleaccessdetails.GetAvccessDetails.Add(Data);
                }

            }
            return roleaccessdetails;
        }



        public dynamic Getlogdetailsstring(int cmpid, string user, string path, string suffix)
        {
            try
            {
                var dd = path + '/' + suffix;
                var UserID = CMPSContext.Role.Where(x => x.RoleDescription == user).Select(x => x.RoleID).FirstOrDefault();
                var companyname = CMPSContext.Company.Where(x => x.CmpID == cmpid).Select(x => x.CompanyName).FirstOrDefault();
                TextWriter txt = new StreamWriter("D:\\Un-AuthorizedLogger.txt");
                txt.Write("Organization : " + companyname + "  - " + "   Log Created  Date and Time " + ':' + DateTime.UtcNow + "\n" + "\n");
                txt.Write("Un-Authorized Access done by  " + ": " + user + "\n");
                txt.Write("Created Date and Time " + ": " + DateTime.UtcNow + "\n");
                txt.Write("Module Trying to Access" + ": " + dd + "\n");
                txt.Close();
                ErrorLog oErrorLogs = new ErrorLog();
                oErrorLogs.WriteErrorLogTitle(companyname, "Un-Authorized Access done by", "User name :", user, "User ID :", Convert.ToString(UserID), "Mode : URL");
                ErrorLog oErrorLog = new ErrorLog();
                oErrorLog.WriteErrorLog("Module Trying to Access :", path);
                oErrorLog.WriteErrorLog("Error : Un-Authorized Access on", path);


            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,
                Message = "Something Went Wrong"
            };


        }

        //public dynamic GetCountryDetail(int cmpid)
        //{
        //    var countryCode = CMPSContext.Setup.Where(x => x.CMPID == cmpid).Select(x => x.Country).FirstOrDefault();

        //    var CountryDetail = CMPSContext.Country.Where(x => x.ID == Convert.ToInt32(countryCode)).Select(x => x.CountryName).FirstOrDefault();
        //    return new
        //    {
        //        CountryDetail = CountryDetail
        //    };
        //}


        public dynamic GetAccessdetailsolm(int cmpid, string user, string path, string MasterNameplus)
        {

            string path1 = MasterNameplus + "/olm/" + path;

            var roleaccessdetails = new RegistrationMasterI();
            roleaccessdetails.GetAvccessDetails = new List<GetAvccessDetails>();
            var roleid = CMPSContext.Users.Where(x => x.Userid == Convert.ToInt32(user)).Select(x => x.ReferenceID).FirstOrDefault();
            var moduleid = CMPSContext.ModuleMaster.Where(x => x.Parentmoduledescription == path1).Select(x => x.ModuleID).FirstOrDefault();
            var listdetails = CMPSContext.RoleVsModule.OrderByDescending(x => x.CreatedUTC).Where(x => x.CmpID == cmpid && x.ModuleID == moduleid && x.RoleID == roleid).FirstOrDefault();

            var Data = new GetAvccessDetails();

            if (listdetails != null)
            {

                if (listdetails.All == true)
                {
                    Data.Add = true;
                    Data.Edit = true;
                    Data.Delete = true;
                    Data.Export = true;
                    Data.Print = true;
                    roleaccessdetails.GetAvccessDetails.Add(Data);
                }
                else
                {
                    Data.Add = listdetails.Add;
                    Data.Edit = listdetails.Edit;
                    Data.Delete = listdetails.Delete;
                    Data.Export = listdetails.Query;
                    Data.Print = listdetails.Print;
                    roleaccessdetails.GetAvccessDetails.Add(Data);
                }

            }




            return roleaccessdetails;
        }






        public dynamic GetAccessdetailsSquintM(int cmpid, string user, string path, string MasterNameplus)
        {

            string path1 = MasterNameplus + "/SquintM/" + path;

            var roleaccessdetails = new RegistrationMasterI();
            roleaccessdetails.GetAvccessDetails = new List<GetAvccessDetails>();
            var roleid = CMPSContext.Users.Where(x => x.Userid == Convert.ToInt32(user)).Select(x => x.ReferenceID).FirstOrDefault();
            var moduleid = CMPSContext.ModuleMaster.Where(x => x.Parentmoduledescription == path1).Select(x => x.ModuleID).FirstOrDefault();
            var listdetails = CMPSContext.RoleVsModule.OrderByDescending(x => x.CreatedUTC).Where(x => x.CmpID == cmpid && x.ModuleID == moduleid && x.RoleID == roleid).FirstOrDefault();

            var Data = new GetAvccessDetails();

            if (listdetails != null)
            {

                if (listdetails.All == true)
                {
                    Data.Add = true;
                    Data.Edit = true;
                    Data.Delete = true;
                    Data.Export = true;
                    Data.Print = true;
                    roleaccessdetails.GetAvccessDetails.Add(Data);
                }
                else
                {
                    Data.Add = listdetails.Add;
                    Data.Edit = listdetails.Edit;
                    Data.Delete = listdetails.Delete;
                    Data.Export = listdetails.Query;
                    Data.Print = listdetails.Print;
                    roleaccessdetails.GetAvccessDetails.Add(Data);
                }

            }




            return roleaccessdetails;
        }





        public IEnumerable<Dropdown> GetEyedoctornamevalueswithappointmentonly(int CMPID)
        {
            var wynkdata = WYNKContext.Appointment.Where(x => x.CMPID == CMPID).ToList();
            var wynkdatatrans = WYNKContext.AppointmentTrans.Where(x => x.CMPID == CMPID && x.Doctorid != 0 && (x.Isstatus == "Re-scheduled" || x.Isstatus == "Open")).ToList();
            var CMPSdata = CMPSContext.DoctorMaster.Where(x => x.CMPID == CMPID).ToList();
            var Appdata = (from app in wynkdata
                           join appt in wynkdatatrans
                           on app.RandomUniqueID equals appt.AppointmentMasterID
                           group new { appt } by new { appt.Doctorid } into g
                           select new Dropdown()
                           {
                               Text = CMPSdata.Where(x => x.DoctorID == g.FirstOrDefault().appt.Doctorid).Select(x => x.Firstname + " " + x.LastName).FirstOrDefault(),
                               Value = Convert.ToString(g.FirstOrDefault().appt.Doctorid),
                           }).ToList();
            return Appdata;
        }


        public dynamic ErrorList(string ErrMsg, string Fname, int cmpid, int Uid)
        {


            var uslist = new UsersListView();

            string cmpname = CMPSContext.Company.Where(x => x.CmpID == cmpid).Select(x => x.CompanyName).FirstOrDefault();

            string username = CMPSContext.DoctorMaster.Where(s => s.EmailID == CMPSContext.Users.Where(x => x.Userid == Uid).Select(x => x.Username).FirstOrDefault()).Select(c => c.Firstname + "" + c.MiddleName + "" + c.LastName).FirstOrDefault();
            string userid = Convert.ToString(Uid);
            ErrorLog oErrorLogs = new ErrorLog();
            oErrorLogs.WriteErrorLogTitle(cmpname, Fname, "User name :", username, "User ID :", userid, "Mode : Submit");

            ErrorLog oErrorLog = new ErrorLog();
            oErrorLog.WriteErrorLog("Message :", ErrMsg.ToString());


            return uslist;
        }

        public IEnumerable<Dropdown> GetDescriptionsvalue(int id)

        {

            return (from s in WYNKContext.allergy.Where(x => x.ParentID == id)
                    where s.IsDeleted == false && s.IsActive == true
                    select new Dropdown
                    {
                        Text = s.ParentDescription,
                        Value = s.ID.ToString()
                    }).ToList();
        }

        public IEnumerable<Dropdown> Gettonometrymas()
        {
            return WYNKContext.Tonometry.Where(x => x.IsActive == true).Select(x => new Dropdown { Text = x.Description, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();

        }
        public dynamic Gettimeinterval(int cmpid)
        {
            return CMPSContext.Setup.Where(x => x.CMPID == cmpid).Select(x => x.GapInterval).FirstOrDefault();

        }
        public IEnumerable<Dropdown> GetDescriptionsvalues()
        {
            return WYNKContext.allergy.Where(x => x.IsActive == true && x.IsDeleted == false && x.ParentID == 0).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetFDDTDescriptionsvalues(int Cmpid)
        {
            return WYNKContext.SpecialityMaster.Where(x => x.IsActive == true && x.ParentTag == "FDDT" && x.CmpID == Cmpid).Select(x => new Dropdown { Text = x.ParentDescription.ToString(), Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetSyringingDescriptions(int Cmpid)
        {
            return WYNKContext.SpecialityMaster.Where(x => x.IsActive == true && x.ParentTag == "SYRINGING" && x.CmpID == Cmpid).Select(x => new Dropdown { Text = x.ParentDescription.ToString(), Value = x.ID.ToString() }).OrderBy(x => x.Text).ToList();
        }


        public IEnumerable<Dropdown> GetRegurgitationDescriptions(int Cmpid)
        {
            return WYNKContext.SpecialityMaster.Where(x => x.IsActive == true && x.ParentTag == "Regurgitation" && x.CmpID == Cmpid).Select(x => new Dropdown { Text = x.ParentDescription.ToString(), Value = x.ParentDescription }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetFluidDescriptions(int Cmpid)
        {
            return WYNKContext.SpecialityMaster.Where(x => x.IsActive == true && x.ParentTag == "Fluid" && x.CmpID == Cmpid).Select(x => new Dropdown { Text = x.ParentDescription.ToString(), Value = x.ParentDescription }).OrderBy(x => x.Text).ToList();
        }

        public IEnumerable<Dropdown> GetStopDescriptions(int Cmpid)
        {
            return WYNKContext.SpecialityMaster.Where(x => x.IsActive == true && x.ParentTag == "Stop" && x.CmpID == Cmpid).Select(x => new Dropdown { Text = x.ParentDescription.ToString(), Value = x.ParentDescription }).OrderBy(x => x.Text).ToList();
        }


        public dynamic GetDoctorFees(int CMPID, int DOCID)
        {
            var docdata = new AppointmentView();

            var olmid = CMPSContext.OneLineMaster.Where(x => x.ParentDescription == "Appointment fees" && x.ParentTag == "ICD GROUP").Select(x => x.OLMID).FirstOrDefault();
            if (olmid != 0 && olmid != null)
            {
                var APPFEESs = (from sc in WYNKContext.SurgeryCostDetail.Where(x => x.CMPID == CMPID)
                                join im in WYNKContext.ICDMaster.OrderByDescending(x => x.CreatedUTC).Where(x => x.ICDGroup == olmid) on sc.ICDCode equals im.ICDCODE
                                join ie in WYNKContext.ICDExtenstion.OrderByDescending(x => x.CreatedUTC).Where(x => x.DoctorID == DOCID) on im.ICDCODE equals ie.ICDCODE
                                select new
                                {
                                    cost = ie.Surgeoncost,
                                }).ToList();

                if (APPFEESs != null && APPFEESs.Count() != 0)
                {
                    docdata.Message = Convert.ToString(APPFEESs.Select(x => x.cost).FirstOrDefault());

                }
                else
                {
                    docdata.Message = "Feesnot";

                }
            }
            else
            {
                docdata.Message = "DeclareAPPTFEES";
            }

            return docdata;
        }


        public dynamic GetPatientDob(string UIN, int Cmpid)
        {
            return new
            {
                Success = true,
                DOB = WYNKContext.Registration.Where(x => x.UIN == UIN && x.CMPID == Cmpid).Select(x => x.DateofBirth).FirstOrDefault()
            };
        }
        //public IEnumerable<Dropdown> GetGoniovalues()
        //{
        //    return CMPSContext.OneLineMaster.Where(X => X.ParentTag == "Gonioscopy" && X.IsActive == true && X.IsDeleted == false).OrderBy(x => x.OLMID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).ToList();
        //}
        public IEnumerable<Dropdown> Getocumvalues(int ID)
        {
            return WYNKContext.SquintExtnMaster.Where(X => X.ParentTag == "OCM" && X.IsActive == true && X.IsDeleted == false && X.CmpID == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).ToList();
        }

        public IEnumerable<Dropdown> Getvfvalues(int ID)
        {
            return WYNKContext.SquintExtnMaster.Where(X => X.ParentTag == "VFI" && X.IsActive == true && X.IsDeleted == false && X.CmpID == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).ToList();
        }

        public IEnumerable<Dropdown> Getanglevalues(int ID)
        {
            return WYNKContext.SquintExtnMaster.Where(X => X.ParentTag == "anglekappa" && X.IsActive == true && X.IsDeleted == false && X.CmpID == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).ToList();
        }

        public IEnumerable<Dropdown> Getposvalues(int ID)
        {
            return WYNKContext.SquintExtnMaster.Where(X => X.ParentTag == "POS" && X.IsActive == true && X.IsDeleted == false && X.CmpID == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).ToList();
        }
        public IEnumerable<Dropdown> Getacamvalues(int ID)
        {
            return WYNKContext.SquintExtnMaster.Where(X => X.ParentTag == "acamethod" && X.IsActive == true && X.IsDeleted == false && X.CmpID == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).ToList();
        }
        public IEnumerable<Dropdown> Getacavvalues(int ID)
        {
            return WYNKContext.SquintExtnMaster.Where(X => X.ParentTag == "acavalue" && X.IsActive == true && X.IsDeleted == false && X.CmpID == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).ToList();
        }
        public IEnumerable<Dropdown> Getwfdtvalues(int ID)
        {
            return WYNKContext.SquintExtnMaster.Where(X => X.ParentTag == "wfdt" && X.IsActive == true && X.IsDeleted == false && X.CmpID == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).ToList();
        }
        public IEnumerable<Dropdown> Getspmvalues(int ID)
        {
            return WYNKContext.SquintExtnMaster.Where(X => X.ParentTag == "Streopsis method" && X.IsActive == true && X.IsDeleted == false && X.CmpID == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).ToList();
        }
        public IEnumerable<Dropdown> Getspvvalues(int ID)
        {
            return WYNKContext.SquintExtnMaster.Where(X => X.ParentTag == "Streopsis value" && X.IsActive == true && X.IsDeleted == false && X.CmpID == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).ToList();
        }
        public IEnumerable<Dropdown> Getarcvalues(int ID)
        {
            return WYNKContext.SquintExtnMaster.Where(X => X.ParentTag == "ARC" && X.IsActive == true && X.IsDeleted == false && X.CmpID == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).ToList();
        }
        public IEnumerable<Dropdown> Getpbcvalues(int ID)
        {
            return WYNKContext.SquintExtnMaster.Where(X => X.ParentTag == "PBCTMK" && X.IsActive == true && X.IsDeleted == false && X.CmpID == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).ToList();
        }
        public IEnumerable<Dropdown> Getampvalues(int ID)
        {
            return WYNKContext.SquintExtnMaster.Where(X => X.ParentTag == "Amplitude" && X.IsActive == true && X.IsDeleted == false && X.CmpID == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).ToList();
        }
        public IEnumerable<Dropdown> Getfrqyvalues(int ID)
        {
            return WYNKContext.SquintExtnMaster.Where(X => X.ParentTag == "Frequency" && X.IsActive == true && X.IsDeleted == false && X.CmpID == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).ToList();
        }
        public IEnumerable<Dropdown> Gettypvalues(int ID)
        {
            return WYNKContext.SquintExtnMaster.Where(X => X.ParentTag == "Type" && X.IsActive == true && X.IsDeleted == false && X.CmpID == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).ToList();
        }
        public IEnumerable<Dropdown> Getpurvalues(int ID)
        {
            return WYNKContext.SquintExtnMaster.Where(X => X.ParentTag == "Pursuit" && X.IsActive == true && X.IsDeleted == false && X.CmpID == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).ToList();
        }
        public IEnumerable<Dropdown> Getsacvalues(int ID)
        {
            return WYNKContext.SquintExtnMaster.Where(X => X.ParentTag == "Saccade" && X.IsActive == true && X.IsDeleted == false && X.CmpID == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).ToList();
        }
        public IEnumerable<Dropdown> Getabhvalues(int ID)
        {
            return WYNKContext.SquintExtnMaster.Where(X => X.ParentTag == "ABH" && X.IsActive == true && X.IsDeleted == false && X.CmpID == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).ToList();
        }
        public IEnumerable<Dropdown> Getconvvalues(int ID)
        {
            return WYNKContext.SquintExtnMaster.Where(X => X.ParentTag == "FOC" && X.IsActive == true && X.IsDeleted == false && X.CmpID == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).ToList();
        }
        public IEnumerable<Dropdown> Getooevalues(int ID)
        {
            return WYNKContext.SquintExtnMaster.Where(X => X.ParentTag == "OOE" && X.IsActive == true && X.IsDeleted == false && X.CmpID == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).ToList();
        }
        public IEnumerable<Dropdown> Getoscvalues(int ID)
        {
            return WYNKContext.SquintExtnMaster.Where(X => X.ParentTag == "Oscillopsia" && X.IsActive == true && X.IsDeleted == false && X.CmpID == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.ID.ToString() }).ToList();
        }
        public IEnumerable<Dropdown> GetGenericvalue(int ID)
        {
            return WYNKContext.DrugGroup.Where(X => X.IsDeleted == false && X.Cmpid == ID).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.Description, Value = x.ID.ToString() }).ToList();
        }

        public IEnumerable<Dropdown> Gettmhvalues()
        {

            return CMPSContext.OneLineMaster.Where(X => X.ParentTag == "TMH" && X.IsActive == true && X.IsDeleted == false).OrderByDescending(x => x.OLMID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).ToList();
        }

        public IEnumerable<Dropdown> Gettbutvalues()
        {

            return CMPSContext.OneLineMaster.Where(X => X.ParentTag == "TBUT" && X.IsActive == true && X.IsDeleted == false).OrderByDescending(x => x.OLMID).Select(x => new Dropdown { Text = x.ParentDescription, Value = x.OLMID.ToString() }).ToList();
        }


        public dynamic GetCMID(string URL)
        {
            var data = new SetupMasterViewModel();
            var cmpdetails = CMPSContext.Company.Where(X => X.URLPATH == URL && X.IsDeleted == false).FirstOrDefault();
            var setupdetails = CMPSContext.Setup.Where(x => x.CMPID == cmpdetails.CmpID).FirstOrDefault();
            data.cmpid = Convert.ToString(cmpdetails.CmpID);
            data.cmpname = cmpdetails.CompanyName;
            data.cmpaddress = cmpdetails.Address1;
            data.cmpphone = cmpdetails.Phone1;
            var fstime = string.Format("{0:00}:{1:00}", setupdetails.FSFromTime.Hours, setupdetails.FSFromTime.Minutes);
            var fsytime = string.Format("{0:00}:{1:00}", setupdetails.FSToTime.Hours, setupdetails.FSToTime.Minutes);
            var sstime = string.Format("{0:00}:{1:00}", setupdetails.SSFromTime.Hours, setupdetails.SSFromTime.Minutes);
            var ssytime = string.Format("{0:00}:{1:00}", setupdetails.SSToTime.Hours, setupdetails.SSToTime.Minutes);
            data.consultinghrs = fstime + " - " + fsytime + " hrs & " + sstime + "-" + ssytime + " hrs";
            return data;
        }

        public dynamic Getalldropdownvalues(int cmpid)
        {
            return CMPSContext.Services.Where(X => X.CMPID == cmpid && X.ParentID == 0).Select(x => new Dropdown
            {
                Text = x.Description,
                Value = x.ID.ToString()
            }).ToList();
        }

        public dynamic Getallchilddropdownvalues(int id)
        {
            var data = new ServicesViewModel();
            data.ServicesGridData = new List<ServicesGridData>();
            var fulllistdat = WYNKContext.ServiceMaster.Where(x => x.parentDescription == Convert.ToString(id)).ToList();
            if (fulllistdat != null)
            {
                foreach (var item in fulllistdat)
                {
                    var dd = new ServicesGridData();
                    dd.Parentdesc = CMPSContext.Services.Where(x => x.ID == Convert.ToInt32(item.parentDescription)).Select(x => x.Description).FirstOrDefault();
                    dd.Childdesc = CMPSContext.Services.Where(x => x.ID == Convert.ToInt32(item.ChildDescription)).Select(x => x.Description).FirstOrDefault();
                    dd.doctor = CMPSContext.DoctorMaster.Where(x => x.DoctorID == Convert.ToInt32(item.DoctorID)).Select(x => x.LastName).FirstOrDefault();
                    dd.room = WYNKContext.Room.Where(x => x.ID == Convert.ToInt32(item.RoomID)).Select(x => x.RoomDescription).FirstOrDefault();
                    dd.insurance = WYNKContext.Insurance.Where(x => x.ID == Convert.ToInt32(item.InsuranceID)).Select(x => x.Name).FirstOrDefault();
                    dd.parentid = Convert.ToString(item.parentDescription);
                    dd.childid = Convert.ToString(item.ChildDescription);
                    dd.docid = Convert.ToString(item.DoctorID);
                    dd.roomid = Convert.ToString(item.RoomID);
                    dd.insuranceid = Convert.ToString(item.InsuranceID);
                    dd.serviceamt = Convert.ToString(item.ServiceCharge);
                    dd.percentage = Convert.ToString(item.DiscountPercentage);
                    dd.eligibleamt = Convert.ToString(item.AmountEligible);
                    dd.netamount = Convert.ToString(item.TotalAmount);
                    data.ServicesGridData.Add(dd);
                }
            }
            data.serviceDropdown = (from cc in CMPSContext.Services.Where(X => X.ParentID == id)
                                    select new serviceDropdown
                                    {
                                        Text = cc.Description,
                                        Value = cc.ID.ToString()
                                    }).ToList();
            return data;
        }
        public dynamic Getalldinsurance(int cmpid)
        {
            return WYNKContext.Insurance.Where(X => X.IsActive == true && X.CMPID == cmpid).OrderByDescending(x => x.ID).Select(x => new Dropdown { Text = x.Name, Value = x.ID.ToString() }).ToList();
        }

        public dynamic saveparentdesc(string id, int cmpid)
        {
            try
            {
                var one = new Service_Master();
                one.Description = id;
                one.ParentID = 0;
                one.CMPID = cmpid;
                one.CreatedUTC = DateTime.UtcNow;
                one.CreatedBy = 1;
                CMPSContext.Services.AddRange(one);
                CMPSContext.SaveChanges();

                if (CMPSContext.SaveChanges() >= 0)
                    return new
                    {
                        Success = true,
                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,
            };
        }

        public dynamic savechilddesc(string id, string desc, int cmpid)
        {
            try
            {
                var one = new Service_Master();
                one.Description = id;
                one.ParentID = Convert.ToInt32(desc);
                one.CMPID = cmpid;
                one.CreatedUTC = DateTime.UtcNow;
                one.CreatedBy = 1;
                CMPSContext.Services.AddRange(one);
                CMPSContext.SaveChanges();

                if (CMPSContext.SaveChanges() >= 0)
                    return new
                    {
                        Success = true,
                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,
            };
        }

        public dynamic Loadallavailablelanguages()
        {
            var data = new SetupMasterViewModel();
            //data.Languagedetauils = new List<Languagedetauils>();
            //CultureInfo[] cinfo = CultureInfo.GetCultures(CultureTypes.AllCultures & ~CultureTypes.NeutralCultures);
            //foreach (CultureInfo cul in cinfo)
            //{
            //    var langdetails = new Languagedetauils();
            //    langdetails.Language = cul.DisplayName + " - " + cul.Name;
            //    data.Languagedetauils.Add(langdetails);
            //}
            return data;
        }

        public dynamic GettingRunningNo(int Cmpid, int TC)
        {
            try
            {
                int? ReceiptId = GettingReceiptTcID(TC, Cmpid);
                string RunningNo = null;
                string ReceiptRunningNo = null;
                if (ReceiptId != null)
                {
                    RunningNo = GenerateRunningCtrlNoo(TC, Cmpid, "GetRunningNo");
                    ReceiptRunningNo = GenerateRunningCtrlNoo(Convert.ToInt32(ReceiptId), Cmpid, "GetRunningNo");
                    return new
                    {
                        RunningNo = RunningNo,
                        ReceiptRunningNo = ReceiptRunningNo,
                    };
                }
                else
                {
                    RunningNo = GenerateRunningCtrlNoo(TC, Cmpid, "GetRunningNo");
                    return new
                    {
                        RunningNo = RunningNo,
                        ReceiptRunningNo = (string)null,
                    };
                }
            }
            catch (Exception)
            {
                return new
                {
                    RunningNo = (string)null,
                    ReceiptRunningNo = (string)null,
                };
            }


        }



    }


}

