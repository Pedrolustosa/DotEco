using System.Threading.Tasks;
using DotEco.Application.Dtos;
using DotEco.Persistence.Models;

namespace DotEco.Application.Contracts
{
    public interface ICollectionDataService
    {
        Task<CollectionDataDto> AddCollectionData(CollectionDataDto model);
        Task<CollectionDataDto> UpdateCollectionData(int collectionDataId, CollectionDataDto model);
        Task<bool> DeleteCollectionData(int collectionDataId);
        Task<PageList<CollectionDataDto>> GetAllCollectionDataAsync(PageParams pageParams);
        Task<CollectionDataDto> GetCollectionDataAsyncById(int collectionDataId);
    }
}