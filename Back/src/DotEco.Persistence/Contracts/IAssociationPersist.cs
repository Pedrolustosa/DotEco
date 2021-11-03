using System.Threading.Tasks;
using DotEco.Domain;

namespace DotEco.Persistence.Contracts
{
    public interface IAssociationPersist
    {
        //ASSOCIATIONS
        Task<Association[]> GetAllAssociationAsync();
        Task<Association> GetAssociationAsyncById(int AssociationId);
    }
}