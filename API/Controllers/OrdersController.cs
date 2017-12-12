using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

using API.Models;
using API.Services;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class OrdersController : Controller
    {   
        private IUnitOfWork _unitOfWork;

        public OrdersController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("paymentproviders")]
        public IActionResult getPaymentProviders() {
            return new ObjectResult(_unitOfWork.Orders.GetPaymentProviders());
        }

        [HttpGet("shipmentproviders")]
        public IActionResult GetShipmentProviders() {
            return new ObjectResult(_unitOfWork.Orders.GetShipmentProviders());
        }

        [HttpGet("statuses")]
        public IActionResult GetStatuses() {
            return new ObjectResult(_unitOfWork.Orders.GetStatuses());
        }

        [HttpGet]
        public IActionResult GetOrders() {
            return new JsonResult(_unitOfWork.Orders.GetAll());
        }
    }
}