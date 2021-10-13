using DotEco.Domain;
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

        //ASSOCIATION
        Task<Association[]> GetAllAssociationAsync();
        Task<Association> GetAssociationAsyncById(int AssociationId);

        //COLLECTION DATA
        Task<CollectionData[]> GetAllCollectionDataAsync();
        Task<CollectionData> GetCollectionDataAsyncById(int CollectionDataId);

        //COUPONS
        Task<Coupons[]> GetAllCouponsAsync();
        Task<Coupons> GetCouponsAsyncById(int CouponsId);
    }
}