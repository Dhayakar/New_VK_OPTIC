using Microsoft.EntityFrameworkCore;
using SMSand_EMAILService.cs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using WYNK.Data.Model;
using WYNK.Data.Model.ViewModel;
using WYNK.Helpers;

namespace WYNK.Data.Repository.Implementation
{
    class LocationRepository : RepositoryBase<LocationMasterViewModel>, IlocationRepository
    {
        private readonly WYNKContext _Wynkcontext;
        private readonly CMPSContext _Cmpscontext;

        public LocationRepository(WYNKContext context, CMPSContext Cmpscontext) : base(context, Cmpscontext)
        {
            _Wynkcontext = context;
            _Cmpscontext = Cmpscontext;

        }



        public dynamic Getcountry()
        {


            var country = new LocationMasterViewModel();
            country.Country = new List<Country>();

            country.CID = CMPSContext.LocationMaster.Where(u => u.ParentDescription == "Country").Select(x => x.ID).FirstOrDefault();


            country.Country = (from D in CMPSContext.LocationMaster.Where(u => u.ParentTag == "COUNTRY" && u.IsActive == true)
                               select new Country
                               {
                                   ID = D.ID,
                                   ParentDescription = D.ParentDescription

                               }).OrderBy(x => x.ParentDescription).ToList();

            return country;
        }
        public dynamic InsertCountry(LocationMasterViewModel country)

        {
            var coun = new LocationMaster();


            if (country.LocMaster.ParentDescription != null)
            {


                var c = CMPSContext.LocationMaster.Where(x => x.ParentDescription.Replace(" ", string.Empty).Equals(country.LocMaster.ParentDescription.Replace(" ", string.Empty), StringComparison.OrdinalIgnoreCase)).Select(y => y.ID).FirstOrDefault();

                if (c != 0)
                {
                    return new
                    {
                        Success = false,
                        Message = "Country name already Exists"
                    };

                }

            }

            coun.ParentDescription = country.LocMaster.ParentDescription;
            coun.ParentID = country.LocMaster.ParentID;
            coun.ParentTag = "COUNTRY";
            coun.IsActive = true;
            coun.CreatedUTC = DateTime.UtcNow;
            coun.CreatedBy = country.LocMaster.CreatedBy;
            CMPSContext.LocationMaster.AddRange(coun);
            try
            {
                if (CMPSContext.SaveChanges() > 0)
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
        public dynamic GetState(int ID)
        {


            var state = new LocationMasterViewModel();
            state.State = new List<State>();


            state.State = (from D in CMPSContext.LocationMaster.Where(u => u.ParentTag == "STATE" && u.IsActive == true && u.ParentID == ID)
                           select new State
                           {
                               ID = D.ID,
                               ParentDescriptionstate = D.ParentDescription

                           }).OrderBy(x => x.ParentDescriptionstate).ToList();

            return state;
        }
        public dynamic InsertState(LocationMasterViewModel state)

        {
            var coun = new LocationMaster();


            if (state.LocMaster.ParentDescription != null)
            {
                var c = CMPSContext.LocationMaster.Where(x => x.ParentID == state.LocMaster.ParentID && x.ParentDescription.Replace(" ", string.Empty).Equals(state.LocMaster.ParentDescription.Replace(" ", string.Empty), StringComparison.OrdinalIgnoreCase)).Select(x => x.ID).FirstOrDefault();

                if (c != 0)
                {
                    return new
                    {
                        Success = false,
                        Message = "State name already Exists"
                    };

                }

            }


            coun.ParentDescription = state.LocMaster.ParentDescription;
            coun.ParentID = state.LocMaster.ParentID;
            coun.ParentTag = "STATE";
            coun.IsActive = true;
            coun.CreatedUTC = DateTime.UtcNow;
            coun.CreatedBy = state.LocMaster.CreatedBy;
            CMPSContext.LocationMaster.AddRange(coun);
            try
            {
                if (CMPSContext.SaveChanges() > 0)
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
        public dynamic GetCity(int ID)
        {

            var city = new LocationMasterViewModel();
            city.City = new List<City>();


            city.City = (from D in CMPSContext.LocationMaster.Where(u => u.ParentTag == "CITY" && u.IsActive == true && u.ParentID == ID)
                         select new City
                         {
                             ID = D.ID,
                             ParentDescriptioncity = D.ParentDescription

                         }).OrderBy(x => x.ParentDescriptioncity).ToList();

            return city;
        }
        public dynamic InsertCity(LocationMasterViewModel City)

        {
            var coun = new LocationMaster();


            if (City.LocMaster.ParentDescription != null)
            {
                var c = CMPSContext.LocationMaster.Where(x => x.ParentID == City.LocMaster.ParentID && x.ParentDescription.Replace(" ", string.Empty).Equals(City.LocMaster.ParentDescription.Replace(" ", string.Empty), StringComparison.OrdinalIgnoreCase)).Select(x => x.ID).FirstOrDefault();

                if (c != 0)
                {
                    return new
                    {
                        Success = false,
                        Message = "City name already exists"
                    };

                }

            }


            coun.ParentDescription = City.LocMaster.ParentDescription;
            coun.ParentID = City.LocMaster.ParentID;
            coun.ParentTag = "CITY";
            coun.IsActive = true;
            coun.CreatedUTC = DateTime.UtcNow;
            coun.CreatedBy = City.LocMaster.CreatedBy;
            CMPSContext.LocationMaster.AddRange(coun);
            try
            {
                if (CMPSContext.SaveChanges() > 0)
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
        public dynamic Getlocation(int ID)
        {


            var state = new LocationMasterViewModel();
            state.location = new List<location>();


            state.location = (from D in CMPSContext.LocationMaster.Where(u => u.ParentTag == "LOCATION" && u.IsActive == true && u.ParentID == ID)
                              select new location
                              {
                                  ID = D.ID,
                                  ParentDescriptionlocation = D.ParentDescription,
                                  Pincode = D.Pincode,

                              }).OrderBy(x => x.ParentDescriptionlocation).ToList();

            return state;
        }
        public dynamic Insertlocation(LocationMasterViewModel Location)

        {
            var coun = new LocationMaster();


            var u = CMPSContext.LocationMaster.Where(x => x.ParentID == Location.LocMaster.ParentID && Location.LocMaster.Pincode == null && x.ParentDescription.Equals(Location.LocMaster.ParentDescription.Replace(" ", string.Empty), StringComparison.OrdinalIgnoreCase)).Select(x => x.ID).FirstOrDefault();

            if (u != 0)
            {

                if (Location.LocMaster.ParentDescription != null)
                {
                    var c = CMPSContext.LocationMaster.Where(x => x.ParentID == Location.LocMaster.ParentID && x.ParentDescription.Replace(" ", string.Empty).Equals(Location.LocMaster.ParentDescription.Replace(" ", string.Empty), StringComparison.OrdinalIgnoreCase)).Select(x => x.ID).FirstOrDefault();

                    if (c != 0)
                    {
                        return new
                        {
                            Success = false,
                            Message = "Location name already exists"
                        };

                    }

                }
            }


            if (Location.LocMaster.ParentDescription != null)
            {
                var c = CMPSContext.LocationMaster.Where(x => x.ParentID == Location.LocMaster.ParentID && x.Pincode == Location.LocMaster.Pincode && x.ParentDescription.Replace(" ", string.Empty).Equals(Location.LocMaster.ParentDescription.Replace(" ", string.Empty), StringComparison.OrdinalIgnoreCase)).Select(x => x.ID).FirstOrDefault();

                if (c != 0)
                {
                    return new
                    {
                        Success = false,
                        Message = "Location name and pincode already exists"
                    };

                }

            }


            coun.ParentDescription = Location.LocMaster.ParentDescription;
            coun.Pincode = Location.LocMaster.Pincode;
            coun.ParentID = Location.LocMaster.ParentID;
            coun.ParentTag = "loc";
            coun.IsActive = true;
            coun.CreatedUTC = DateTime.UtcNow;
            coun.CreatedBy = Location.LocMaster.CreatedBy;
            CMPSContext.LocationMaster.AddRange(coun);

            try
            {
                if (CMPSContext.SaveChanges() > 0)
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
        public dynamic Getfulllocation(int ID)
        {
            var locationdet = new LocationMasterViewModel();
            List<statedetails> statedetails = new List<statedetails>();
            locationdet.citydetails = new List<citydetails>();
            locationdet.loactiondetails = new List<loactiondetails>();

            var location = CMPSContext.LocationMaster.ToList();


            var country = (from C in location.Where(u => u.ID == ID && u.IsActive == true)
                           select new
                           {
                               Countryname = C.ParentDescription != null ? C.ParentDescription : string.Empty,
                               CountryID = C.ID,
                           }).ToList();

            if (country.Count() > 0)
            {
                foreach (var itm in country.ToList())
                {

                    statedetails.AddRange((from S in location.Where(x => x.ParentID == itm.CountryID && x.IsActive == true)
                                           select new statedetails
                                           {
                                               Statename = S.ParentDescription != null ? S.ParentDescription : string.Empty,
                                               StateID = itm.CountryID != 0 ? S.ID : 0,
                                               Countryname = itm.Countryname,
                                           }).ToList());

                }
            }

            if (statedetails.Count() > 0)
            {

                foreach (var itm in statedetails.ToList())
                {
                    var cityfull = location.Where(x => x.ParentID == itm.StateID && x.IsActive == true).Select(x => x.ID).ToList();

                    if (cityfull.Count() > 0)
                    {
                        foreach (var itms in cityfull.ToList())
                        {
                            var citydetails = new citydetails();
                            citydetails.Countryname = itm.Countryname;
                            citydetails.Statename = itm.Statename;
                            citydetails.Cityname = location.Where(x => x.ID == itms).Select(x => x.ParentDescription).FirstOrDefault();
                            citydetails.CityID = itms;
                            locationdet.citydetails.Add(citydetails);

                        }
                    }
                    else
                    {
                        var citydetails = new citydetails();
                        citydetails.Countryname = itm.Countryname;
                        citydetails.Statename = itm.Statename;
                        citydetails.Cityname = string.Empty;
                        citydetails.CityID = null;
                        locationdet.citydetails.Add(citydetails);
                    }
                }

            }

            if (locationdet.citydetails.Count() > 0)
            {

                foreach (var itm in locationdet.citydetails.ToList())
                {
                    var locationfull = location.Where(x => x.ParentID == itm.CityID && x.IsActive == true).Select(x => x.ID).ToList();

                    if (locationfull.Count() > 0)
                    {
                        foreach (var itms in locationfull.ToList())
                        {
                            var loactiondetails = new loactiondetails();
                            loactiondetails.Countryname = itm.Countryname;
                            loactiondetails.Statename = itm.Statename;
                            loactiondetails.Cityname = itm.Cityname;
                            loactiondetails.Loactionname = location.Where(x => x.ID == itms).Select(x => x.ParentDescription).FirstOrDefault();
                            loactiondetails.Pincode = location.Where(x => x.ID == itms).Select(x => x.Pincode).FirstOrDefault();
                            loactiondetails.LoactionID = itms;
                            locationdet.loactiondetails.Add(loactiondetails);

                        }
                    }
                    else
                    {
                        var loactiondetails = new loactiondetails();
                        loactiondetails.Countryname = itm.Countryname;
                        loactiondetails.Statename = itm.Statename;
                        loactiondetails.Cityname = itm.Cityname;
                        loactiondetails.Loactionname = string.Empty;
                        loactiondetails.Pincode = null;
                        loactiondetails.LoactionID = 0;
                        locationdet.loactiondetails.Add(loactiondetails);
                    }


                }

            }

            return locationdet.loactiondetails;
        }
        public dynamic Updatelocation(LocationMasterViewModel upLocation, int ID)
        {

            var coun = new LocationMaster();



            var u = CMPSContext.LocationMaster.Where(x => x.ParentID == upLocation.LocMaster.ParentID && upLocation.LocMaster.Pincode == null && x.ParentDescription.Equals(Convert.ToString(upLocation.LocMaster.ParentDescription), StringComparison.OrdinalIgnoreCase)).Select(x => x.ID).FirstOrDefault();

            if (u != 0)
            {

                if (upLocation.LocMaster.ParentDescription != null)
                {
                    var c = CMPSContext.LocationMaster.Where(x => x.ParentID == upLocation.LocMaster.ParentID && x.ParentDescription.Replace(" ", string.Empty).Equals(upLocation.LocMaster.ParentDescription.Replace(" ", string.Empty), StringComparison.OrdinalIgnoreCase)).Select(x => x.ID).FirstOrDefault();

                    if (c != 0)
                    {
                        return new
                        {
                            Success = false,
                            Message = "Location name already exists"
                        };

                    }

                }
            }


            if (upLocation.LocMaster.ParentDescription != null)
            {
                var c = CMPSContext.LocationMaster.Where(x => x.ParentID == upLocation.LocMaster.ParentID && x.Pincode == upLocation.LocMaster.Pincode && x.ParentDescription.Replace(" ", string.Empty).Equals(upLocation.LocMaster.ParentDescription.Replace(" ", string.Empty), StringComparison.OrdinalIgnoreCase)).Select(x => x.ID).FirstOrDefault();

                if (c != 0)
                {
                    return new
                    {
                        Success = false,
                        Message = "Location name and pincode already exists"
                    };

                }

            }

            coun = CMPSContext.LocationMaster.Where(x => x.ID == ID).FirstOrDefault();

            coun.ParentDescription = upLocation.LocMaster.ParentDescription;
            coun.Pincode = upLocation.LocMaster.Pincode;
            coun.UpdatedUTC = DateTime.UtcNow;
            coun.UpdatedBy = upLocation.LocMaster.UpdatedBy;
            CMPSContext.LocationMaster.UpdateRange(coun);

            try
            {
                if (CMPSContext.SaveChanges() > 0)
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
        public dynamic Updatecity(LocationMasterViewModel upcity, int ID)
        {

            var coun = new LocationMaster();


            if (upcity.LocMaster.ParentDescription != null)
            {
                var c = CMPSContext.LocationMaster.Where(x => x.ParentID == upcity.LocMaster.ParentID && x.ParentDescription.Replace(" ", string.Empty).Equals(upcity.LocMaster.ParentDescription.Replace(" ", string.Empty), StringComparison.OrdinalIgnoreCase)).Select(x => x.ID).FirstOrDefault();

                if (c != 0)
                {
                    return new
                    {
                        Success = false,
                        Message = "City name already exists"
                    };

                }

            }

            coun = CMPSContext.LocationMaster.Where(x => x.ID == ID).FirstOrDefault();

            coun.ParentDescription = upcity.LocMaster.ParentDescription;
            coun.UpdatedUTC = DateTime.UtcNow;
            coun.UpdatedBy = upcity.LocMaster.UpdatedBy;
            CMPSContext.LocationMaster.UpdateRange(coun);

            try
            {
                if (CMPSContext.SaveChanges() > 0)
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
        public dynamic UpdateState(LocationMasterViewModel upstate, int ID)
        {

            var coun = new LocationMaster();


            if (upstate.LocMaster.ParentDescription != null)
            {
                var c = CMPSContext.LocationMaster.Where(x => x.ParentID == upstate.LocMaster.ParentID && x.ParentDescription.Replace(" ", string.Empty).Equals(upstate.LocMaster.ParentDescription.Replace(" ", string.Empty), StringComparison.OrdinalIgnoreCase)).Select(x => x.ID).FirstOrDefault();

                if (c != 0)
                {
                    return new
                    {
                        Success = false,
                        Message = "State name already Exists"
                    };

                }

            }

            coun = CMPSContext.LocationMaster.Where(x => x.ID == ID).FirstOrDefault();

            coun.ParentDescription = upstate.LocMaster.ParentDescription;
            coun.UpdatedUTC = DateTime.UtcNow;
            coun.UpdatedBy = upstate.LocMaster.UpdatedBy;
            CMPSContext.LocationMaster.UpdateRange(coun);

            try
            {
                if (CMPSContext.SaveChanges() > 0)
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
        public dynamic UpdateCountry(LocationMasterViewModel upcountry, int ID)
        {

            var coun = new LocationMaster();


            if (upcountry.LocMaster.ParentDescription != null)
            {


                var c = CMPSContext.LocationMaster.Where(x => x.ParentDescription.Replace(" ", string.Empty).Equals(upcountry.LocMaster.ParentDescription.Replace(" ", string.Empty), StringComparison.OrdinalIgnoreCase)).Select(y => y.ID).FirstOrDefault();

                if (c != 0)
                {
                    return new
                    {
                        Success = false,
                        Message = "Country name already Exists"
                    };

                }

            }

            coun = CMPSContext.LocationMaster.Where(x => x.ID == ID).FirstOrDefault();

            coun.ParentDescription = upcountry.LocMaster.ParentDescription;
            coun.UpdatedUTC = DateTime.UtcNow;
            coun.UpdatedBy = upcountry.LocMaster.UpdatedBy;
            CMPSContext.LocationMaster.UpdateRange(coun);

            try
            {
                if (CMPSContext.SaveChanges() > 0)
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
        public dynamic DeleteLocation(int ID)
        {
            var stoMas = CMPSContext.LocationMaster.Where(x => x.ID == ID).ToList();

            if (stoMas != null)
            {
                stoMas.All(x => { x.IsActive = false; return true; });
                CMPSContext.LocationMaster.UpdateRange(stoMas);

            }

            try
            {
                if (CMPSContext.SaveChanges() >= 0)
                    return new
                    {
                        Success = true,
                        Message = CommonRepository.saved
                    };
            }
            catch (Exception ex)
            {
                Console.Write(ex);
            }
            return new
            {
                Success = false,
                Message = CommonRepository.Missing
            };

        }













        /////////////////////////////////////////////////////////////////////////////////

    }
}


