using System.Threading.Tasks;
using DotEco.Domain;
using DotEco.Persistence.Models;

namespace DotEco.Persistence.Contracts
{
    public interface IAssociationPersist
    {
        //ASSOCIATIONS
        Task<Association[]> GetAllAssociationAsync();
        Task<Association> GetAssociationAsyncById(int AssociationId);
    }
}