using System;
using System.Threading.Tasks;
using AutoMapper;
using DotEco.Application.Contracts;
using DotEco.Application.Dtos;
using DotEco.Domain;
using DotEco.Persistence.Contracts;

namespace DotEco.Application
{
    public class AssociationService : IAssociationService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IAssociationPersist _associationPersist;
        private readonly IMapper _mapper;
        public AssociationService(IGeralPersist geralPersist,
                             IAssociationPersist associationPersist,
                             IMapper mapper)
        {
            _geralPersist = geralPersist;
            _associationPersist = associationPersist;
            _mapper = mapper;
        }
        public async Task<AssociationDto> AddAssociation(AssociationDto model)
        {
            try
            {
                var association = _mapper.Map<Association>(model);

                _geralPersist.Add<Association>(association);

                if (await _geralPersist.SaveChangesAsync())
                {
                    var associationRetorno = await _associationPersist.GetAssociationAsyncById(association.Id);

                    return _mapper.Map<AssociationDto>(associationRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<AssociationDto> UpdateAssociation(int associationId, AssociationDto model)
        {
            try
            {
                var association = await _associationPersist.GetAssociationAsyncById(associationId);
                if (association == null) return null;

                model.Id = associationId;

                _mapper.Map(model, association);

                _geralPersist.Update<Association>(association);

                if (await _geralPersist.SaveChangesAsync())
                {
                    var associationRetorno = await _associationPersist.GetAssociationAsyncById(associationId);

                    return _mapper.Map<AssociationDto>(associationRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteAssociation(int associationId)
        {
            try
            {
                var association = await _associationPersist.GetAssociationAsyncById(associationId);
                if (association == null) throw new Exception("association para delete não encontrado.");

                _geralPersist.Delete<Association>(association);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<AssociationDto[]> GetAllAssociationAsync()
        {
            try
            {
                var associations = await _associationPersist.GetAllAssociationAsync();
                if (associations == null) return null;

                var result = _mapper.Map<AssociationDto[]>(associations);

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<AssociationDto> GetAssociationAsyncById(int associationId)
        {
            try
            {
                var association = await _associationPersist.GetAssociationAsyncById(associationId);
                if (association == null) return null;

                var resultado = _mapper.Map<AssociationDto>(association);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}