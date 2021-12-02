using System.Threading.Tasks;
using DotEco.Domain;

namespace DotEco.Persistence.Contracts
{
    public interface ICollectionDataPersist
    {
        //COLLECTION DATAS
        Task<CollectionData[]> GetAllCollectionDataAsync();
        Task<CollectionData[]> GetCollectionDataByUserIdAsync(int userId);
        Task<CollectionData[]> GetCollectionDataByAssociationIdAsync(int associationId);
        Task<CollectionData> GetCollectionDataAsyncById(int CollectionDataId);
    }
}