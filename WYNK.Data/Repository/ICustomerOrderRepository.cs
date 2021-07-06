using System;
using System.Collections.Generic;
using System.Text;
using WYNK.Data.Model.ViewModel;
using Microsoft.AspNetCore.Http;


namespace WYNK.Data.Repository
{
    public interface ICustomerOrderRepository : IRepositoryBase<CustomerOrderViewModel>
    {
        dynamic GetOfferDetail(int CMPID,int LMID,int LTID);
        dynamic SubmitCustomerOrder(CustomerOrderViewModel CustomerOrderDetails);
        dynamic GetCustomerOrderedList(int CMPID,int TC);
        dynamic GetOrderNoDetails(int CMPID,string OrderNo);

        dynamic SubmitCustomerOrderCancel(CustomerOrderViewModel CustomerOrderCancelDetails,DateTime CancelDate);
        dynamic GetCustomerCancelOrderedList(int CMPID, int TC);
        dynamic GetCancelOrderNoDetails(int CMPID, string CancelOrderNo);
        dynamic GetfinalopDetails(int CMPID);
        dynamic IsCustomerFound(int CMPID, string UIN);

        dynamic CustomerDetailsSubmit(CustomerSubmit CustomerSubmitDetails, int CMPID,int UserId);
        dynamic UploadImage(IFormFile file, string CustomerOrderNo);
    }
}
