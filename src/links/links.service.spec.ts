import { Test, TestingModule } from '@nestjs/testing';
import { LinksService } from './links.service';
import { LinkRepository } from './links.repository';
import { HttpException } from '@nestjs/common';
import { Types } from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

describe('LinksService', () => {
  let service: LinksService;
  let mockLinkRepository: any;
  
  beforeEach(async () => {
    // Создаем мок для LinkRepository
    mockLinkRepository = {
      existLinkByValue: jest.fn(value => Promise.resolve(false)),
      createLink: jest.fn(value => Promise.resolve({_id: new Types.ObjectId('6672e0715ed3a3703c8bc04d'), value: value, isActive: true})),
      findLinkById: jest.fn(id => Promise.resolve({_id: id, value: 'http://example.com', isActive: true})),
      updateLink: jest.fn((id, isActive) => Promise.resolve(true)),
    };
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinksService,
        {
          provide: LinkRepository,
          useValue: mockLinkRepository,
        },
      ],
    }).compile();
    
    service = module.get<LinksService>(LinksService);
  });
  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createLink', () => {
    it('should throw an error if link already exists', async () => {
      jest.spyOn(mockLinkRepository, 'existLinkByValue').mockResolvedValueOnce(true);
      await expect(service.createLink('http://example.com')).rejects.toThrow(HttpException);
    });

    it('should return a new link if it does not exist', async () => {
      const link = await service.createLink('http://example.com');
      expect(link).toEqual(`${process.env.DOMAIN}/links/6672e0715ed3a3703c8bc04d`);
    });
  });

  describe('getLink', () => {
    it('should throw an error if link is invalid or has already been used', async () => {
      jest.spyOn(mockLinkRepository, 'findLinkById').mockResolvedValueOnce(null);
      await expect(service.getLink(new Types.ObjectId())).rejects.toThrow(HttpException);
    });

    it('should deactivate the link and return its value', async () => {
      const objectId = new Types.ObjectId();
      const link = await service.getLink(objectId);
      expect(link).toEqual('http://example.com');
      expect(mockLinkRepository.updateLink).toHaveBeenCalledWith(objectId, false);
    });
  });
});