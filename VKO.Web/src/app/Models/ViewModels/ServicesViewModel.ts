export class Services{
  cmpid: string;  
  ServicesGridData: Array<ServicesGridData> = [];

}

export class ServicesGridData{
  Parentdesc: string;
  Childdesc: string;
  insurance: string;
  insuranceid: string;
  roomid: string;
  docid: string;
  childid: string;
  parentid: string;

  room: string;
  serviceamt: string;
  doctor: string;
  percentage: string;
  eligibleamt: string;
  netamount: string; 
}
