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
        Task<CollectionDataDto[]> GetAllCollectionDataAsync();
        Task<CollectionDataDto[]> GetCollectionDataByUserIdAsync(int userId);
        Task<CollectionDataDto[]> GetCollectionDataByAssociationIdAsync(int associationId);
        Task<CollectionDataDto> GetCollectionDataAsyncById(int collectionDataId);
    }
}