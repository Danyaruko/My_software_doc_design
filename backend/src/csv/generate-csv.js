"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvGenerator = void 0;
var commander_1 = require("commander");
var faker = require("@faker-js/faker");
var csv_writer_1 = require("csv-writer");
var USERS = 1000;
var SINGERS = 1000;
var PLAYLISTS = 1000;
var SONGS = 1000;
var CsvGenerator = /** @class */ (function () {
    function CsvGenerator() {
    }
    CsvGenerator.prototype.generateUsersCsv = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, i, csvWriter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = [];
                        // Generate users data
                        for (i = 0; i < USERS; i++) {
                            data.push({
                                userId: i,
                                username: faker.faker.internet.userName(),
                                email: faker.faker.internet.email(),
                                password: faker.faker.internet.password(),
                            });
                        }
                        csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
                            path: 'users.csv',
                            header: [
                                { id: 'userId', title: 'User Id' },
                                { id: 'username', title: 'Username' },
                                { id: 'email', title: 'Email' },
                                { id: 'password', title: 'Password' },
                            ],
                        });
                        return [4 /*yield*/, csvWriter.writeRecords(data)];
                    case 1:
                        _a.sent();
                        console.log('Users CSV file generated successfully!');
                        return [2 /*return*/];
                }
            });
        });
    };
    CsvGenerator.prototype.generateSingersCsv = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, i, csvWriter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = [];
                        // Generate singers data
                        for (i = 0; i < SINGERS; i++) {
                            data.push({
                                singerId: i,
                                name: faker.faker.person.fullName(),
                            });
                        }
                        csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
                            path: 'singers.csv',
                            header: [
                                { id: 'singerId', title: 'Singer ID' },
                                { id: 'name', title: 'Name' },
                            ],
                        });
                        return [4 /*yield*/, csvWriter.writeRecords(data)];
                    case 1:
                        _a.sent();
                        console.log('Singers CSV file generated successfully!');
                        return [2 /*return*/];
                }
            });
        });
    };
    CsvGenerator.prototype.generatePlaylistsCsv = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, i, csvWriter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = [];
                        // Generate playlists data
                        for (i = 0; i < PLAYLISTS; i++) {
                            data.push({
                                playlistId: i,
                                name: faker.faker.music.songName(),
                                timesPlayed: faker.faker.datatype.number({ min: 0, max: 300000 }),
                                ownerId: faker.faker.datatype.number({ min: 1, max: USERS }),
                            });
                        }
                        csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
                            path: 'playlists.csv',
                            header: [
                                { id: 'playlistId', title: 'Playlist Id' },
                                { id: 'name', title: 'Name' },
                                { id: 'timesPlayed', title: 'Times Played' },
                                { id: 'ownerId', title: 'Owner Id' },
                            ],
                        });
                        return [4 /*yield*/, csvWriter.writeRecords(data)];
                    case 1:
                        _a.sent();
                        console.log('Playlists CSV file generated successfully!');
                        return [2 /*return*/];
                }
            });
        });
    };
    CsvGenerator.prototype.generateSongsCsv = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, i, csvWriter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = [];
                        for (i = 0; i < SONGS; i++) {
                            data.push({
                                songId: i,
                                name: faker.faker.music.songName(),
                                genre: faker.faker.music.genre(),
                                timesPlayed: faker.faker.datatype.number({ min: 0, max: 300000 }),
                                durationInSec: faker.faker.datatype.number({ min: 90, max: 1000 }),
                            });
                        }
                        csvWriter = (0, csv_writer_1.createObjectCsvWriter)({
                            path: 'songs.csv',
                            header: [
                                { id: 'songId', title: 'ID' },
                                { id: 'name', title: 'Name' },
                                { id: 'genre', title: 'Genre' },
                                { id: 'timesPlayed', title: 'Times Played' },
                                { id: 'durationInSec', title: 'Duration in Seconds' },
                            ],
                        });
                        return [4 /*yield*/, csvWriter.writeRecords(data)];
                    case 1:
                        _a.sent();
                        console.log('Songs CSV file generated successfully!');
                        return [2 /*return*/];
                }
            });
        });
    };
    return CsvGenerator;
}());
exports.CsvGenerator = CsvGenerator;
var program = new commander_1.Command();
var myCsvGenerator = new CsvGenerator();
program
    .command('generate')
    .description('Generate CSV file with sample data for all tables')
    .option('output.csv')
    .action(function (_a) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, myCsvGenerator.generateUsersCsv()];
            case 1:
                _b.sent();
                return [4 /*yield*/, myCsvGenerator.generateSingersCsv()];
            case 2:
                _b.sent();
                return [4 /*yield*/, myCsvGenerator.generatePlaylistsCsv()];
            case 3:
                _b.sent();
                return [4 /*yield*/, myCsvGenerator.generateSongsCsv()];
            case 4:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
program.parse(process.argv);
