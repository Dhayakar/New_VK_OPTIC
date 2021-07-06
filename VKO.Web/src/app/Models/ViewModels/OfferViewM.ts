import { Offer } from '../Offer';
import { OfferTran } from '../OfferTran';



export class OfferViewM {

  Offer: Offer = new Offer();
  OfferTran: OfferTran = new OfferTran();

  getModel: Array<getModel> = [];
  ListItems: Array<ListItems> = [];
  ModelItems: Array<ModelItems> = [];
  ModelItems2: Array<ModelItems2> = [];
  ModelItems3: Array<ModelItems3> = [];
  oneplusOfferItems: Array<oneplusOfferItems> = [];
  freemodls: Array<freemodls> = [];
}


export class getModel {
  Text: string;
  Value: number;
}

export class ListItems {

  Models: string;
}

export class ModelItems {

  Models: string;
  LMID: number;
  LTID: number;
  
}

export class ModelItems2 {
  BrandID: number;
  BrandName: string;
  Models: string;
  LMID: number;
  LTID: number;
  OfferType: string;
}


export class ModelItems3 {
  BrandID: number;
  BrandName: string;
  Models: string;
  LMID: number;
  LTID: number;
  OfferType: string;
}



export class oneplusOfferItems {

  LMID: number;
  LTID: number;
  Models: string;
  OfferLMID: number;
  OfferLTID: number;
  OfferType: string;
  oneplusModel: string;
}

export class freemodls{

 
  Value: number;
  Values: number;

}

