using System.Threading.Tasks;
using DotEco.Domain;
using DotEco.Persistence.Models;

namespace DotEco.Persistence.Contracts
{
    public interface ICollectionDataPersist
    {
        //COLLECTION DATAS
        Task<PageList<CollectionData>> GetAllCollectionDataAsync(PageParams pageParams);
        Task<CollectionData> GetCollectionDataAsyncById(int CollectionDataId);
    }
}