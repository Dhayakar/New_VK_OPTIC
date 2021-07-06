import { Doctor_Master } from "../DoctorMaster.model"
import { User_Master } from '../User';




export class UsersVsRole {

  //doctormaster: Doctor_Master = new Doctor_Master();
  usermaster: User_Master = new User_Master();
  Inetrnaluserdetails: iNTERNALUserDETAILS = new iNTERNALUserDETAILS();
  ExternalUserDetails: ExternalUserDetails = new ExternalUserDetails();
  DrDetails: Array<DrDetails> = [];

  GetDoctorDetails1: Array<GetDoctorDetails1> = [];
  GetEmployeeDetails1: Array<GetEmployeeDetails1> = [];

}

export class GetDoctorDetails1
{
  userId: number;
  Title: string;
  Firstname: string;
  LastName: string;
  MiddleName: string;
  Phone1: string;
  EmailID: string;
  Status: boolean;

}
export class GetEmployeeDetails1 {
  userId: number;
  Title: string;
  Firstname: string;
  LastName: string;
  MiddleName: string;
  Phone1: string;
  EmailID: string;
  Status: boolean;

}

export class DrDetails {

  UserRoleID: number;
  DoctorID: number;
  Title: string;
  Firstname: string;
  LastName: string;
  MiddleName: string;
  Phone1: string;
  EmailID: string;
  Usertype1: string;
  Usertype : number;
  Roletype : number;

}

export class ExternalUserDetails {
  Userrole: string;
  Emaildid: string;
  password: string;
  companyid: string;
}

export class iNTERNALUserDETAILS {
  Baserole: string;
  Userrole: string;
  password: string;
  Confirmpassword: string;
  companyid: string;
  AccessRole: string;
  Userid: string;
}

