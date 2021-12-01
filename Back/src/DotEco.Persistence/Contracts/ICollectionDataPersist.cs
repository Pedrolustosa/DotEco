using System.Threading.Tasks;
using DotEco.Domain;
using DotEco.Persistence.Models;

namespace DotEco.Persistence.Contracts
{
    public interface ICollectionDataPersist
    {
        //COLLECTION DATAS
        Task<CollectionData[]> GetAllCollectionDataAsync();
        Task<CollectionData> GetCollectionDataAsyncById(int CollectionDataId);
    }
}