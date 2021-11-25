using System.Threading.Tasks;
using DotEco.Domain;
using DotEco.Persistence.Models;

namespace DotEco.Persistence.Contracts
{
    public interface IAssociationPersist
    {
        //ASSOCIATIONS
        Task<PageList<Association>> GetAllAssociationAsync(PageParams pageParams);
        Task<Association> GetAssociationAsyncById(int AssociationId);
    }
}