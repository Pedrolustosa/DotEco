using System.Threading.Tasks;
using DotEco.Application.Dtos;
using DotEco.Persistence.Models;

namespace DotEco.Application.Contracts
{
    public interface IAssociationService
    {
        Task<AssociationDto> AddAssociation(AssociationDto model);
        Task<AssociationDto> UpdateAssociation(int associationId, AssociationDto model);
        Task<bool> DeleteAssociation(int associationId);
        Task<AssociationDto[]> GetAllAssociationAsync();
        Task<AssociationDto> GetAssociationAsyncById(int associationId);
    }
}