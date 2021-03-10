"use strict";
/*
    this file handles the services for all the technology related
    actions and interacts with database
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
const index_2 = require("../utils/index");
const configLogger_1 = require("../configLogger");
class TechnologyService {
    //get all technologies from the database
    getAllTechnologies() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.database.findTechnologies({});
                if (!Array.isArray(result) && result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return result;
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: index_2.Errors.INTERNAL_ERROR };
            }
        });
    }
    //updates technology name and details
    editTechnology(technology_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let filter = {
                    name: technology_info.name
                };
                let updateDoc = {
                    details: technology_info.details
                };
                const result = yield index_1.database.updateTechnology(filter, updateDoc);
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (result.affected < 1) {
                    throw new Error(index_2.Errors.TECHNOLOGY_NOT_FOUND);
                }
                return { message: index_2.Messages.TECHNOLOGY_UPDATED };
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
    //removes the technology from database matching given name
    removeTechnology(technology_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.database.deleteTechnology({ name: technology_info.name });
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (result.affected !== 1) {
                    throw new Error(index_2.Errors.TECHNOLOGY_NOT_FOUND);
                }
                return { message: index_2.Messages.TECHNOLOGY_DELETED };
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
    //finds if technology exists with given the key and value
    checkTechnologyExist(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let technology_info = {};
                technology_info[key] = value;
                const result = yield index_1.database.findTechnology(technology_info);
                if (!result) {
                    throw new Error(index_2.Errors.TECHNOLOGY_NOT_FOUND);
                }
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return result;
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
    //adds a new technology with all the given technology information
    addTechnology(technology_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let technology = {};
                technology.technology_id = index_2.helperFunctions.generateId();
                technology.name = technology_info.name;
                if (technology_info.details)
                    technology.details = technology_info.details;
                const result = yield index_1.database.insertTechnology(technology);
                if (result.error || result.affected < 1) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return { message: index_2.Messages.TECHNOLOGY_CREATED };
            }
            catch (err) {
                configLogger_1.logger.log('error', err.message);
                return { error: err.message };
            }
        });
    }
}
exports.default = TechnologyService;
