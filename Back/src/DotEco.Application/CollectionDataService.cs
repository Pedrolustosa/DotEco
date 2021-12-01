using System;
using System.Threading.Tasks;
using AutoMapper;
using DotEco.Application.Contracts;
using DotEco.Application.Dtos;
using DotEco.Domain;
using DotEco.Persistence.Contracts;
using DotEco.Persistence.Models;

namespace DotEco.Application
{
    public class CollectionDataService : ICollectionDataService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly ICollectionDataPersist _collectionDataPersist;
        private readonly IMapper _mapper;
        public CollectionDataService(IGeralPersist geralPersist,
                             ICollectionDataPersist collectionDataPersist,
                             IMapper mapper)
        {
            _geralPersist = geralPersist;
            _collectionDataPersist = collectionDataPersist;
            _mapper = mapper;
        }
        public async Task<CollectionDataDto> AddCollectionData(CollectionDataDto model)
        {
            try
            {
                var collectionData = _mapper.Map<CollectionData>(model);

                _geralPersist.Add<CollectionData>(collectionData);

                if (await _geralPersist.SaveChangesAsync())
                {
                    var collectionDataRetorno = await _collectionDataPersist.GetCollectionDataAsyncById(collectionData.Id);

                    return _mapper.Map<CollectionDataDto>(collectionDataRetorno);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteCollectionData(int collectionDataId)
        {
            try
            {
                var collectionData = await _collectionDataPersist.GetCollectionDataAsyncById(collectionDataId);
                if (collectionData == null) throw new Exception("association para delete não encontrado.");

                _geralPersist.Delete<CollectionData>(collectionData);
                return await _geralPersist.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CollectionDataDto[]> GetAllCollectionDataAsync()
        {
            try
            {
                var collectionDatas = await _collectionDataPersist.GetAllCollectionDataAsync();
                if (collectionDatas == null) return null;

                var result = _mapper.Map<CollectionDataDto[]>(collectionDatas);

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CollectionDataDto> GetCollectionDataAsyncById(int collectionDataId)
        {
            try
            {
                var collectionData = await _collectionDataPersist.GetCollectionDataAsyncById(collectionDataId);
                if (collectionData == null) return null;

                var resultado = _mapper.Map<CollectionDataDto>(collectionData);

                return resultado;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CollectionDataDto> UpdateCollectionData(int collectionDataId, CollectionDataDto model)
        {
            try
            {
                var collectionData = await _collectionDataPersist.GetCollectionDataAsyncById(collectionDataId);
                if (collectionData == null) return null;

                model.Id = collectionDataId;

                _mapper.Map(model, collectionData);

                _geralPersist.Update<CollectionData>(collectionData);

                if (await _geralPersist.SaveChangesAsync())
                {
                    var collectionDataReturn = await _collectionDataPersist.GetCollectionDataAsyncById(collectionDataId);

                    return _mapper.Map<CollectionDataDto>(collectionDataReturn);
                }
                return null;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}