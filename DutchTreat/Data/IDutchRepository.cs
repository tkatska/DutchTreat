using System.Collections.Generic;
using DutchTreat.Data.Entities;

namespace DutchTreat.Data
{
    public interface IDutchRepository
    {
        IEnumerable<Product> GetAllProducts();
        IEnumerable<Product> GetProductsByCategory(string category);
        bool SaveChanges();
        IEnumerable<Order> GetAllOrders();
        IEnumerable<Order> GetAllOrdersByUser(string username, bool includeItems);
        Order GetOrderById(string username, int id);
        
        IEnumerable<Order> GetAllOrders(bool includeItems);
        void AddOrder(Order newOrder);
        void AddEntity(object model);
    }
}