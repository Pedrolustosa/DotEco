using DotEco.Domain;
using DotEco.Domain.Identity;
using System.Threading.Tasks;

namespace DotEco.Persistence
{
    public interface IDotEcoRepository
    {
        //GERAL
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        void DeleteRange<T>(T[] entity) where T : class;
        Task<bool> SaveChangesAsync();

        //USERS
        Task<User[]> GetAllUserAsync();
        Task<User> GetUsersAsyncById(int UserId);

        //ASSOCIATIONS
        Task<Association[]> GetAllAssociationAsync();
        Task<Association> GetAssociationAsyncById(int AssociationId);

        //COLLECTION DATAS
        Task<CollectionData[]> GetAllCollectionDataAsync();
        Task<CollectionData> GetCollectionDataAsyncById(int CollectionDataId);

        //COUPONS
        Task<Coupons[]> GetAllCouponsAsync();
        Task<Coupons> GetCouponsAsyncById(int CouponsId);
    }
}