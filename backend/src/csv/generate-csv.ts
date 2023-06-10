import { Command } from 'commander';
import * as faker from '@faker-js/faker';
import { createObjectCsvWriter } from 'csv-writer';

const USERS = 1000;
const SINGERS = 1000;
const PLAYLISTS = 1000;
const SONGS = 1000;

export class CsvGenerator {
  async generateUsersCsv() {
    let data = [];

    // Generate users data
    for (let i = 0; i < USERS; i++) {
      data.push({
        userId: i,
        username: faker.faker.internet.userName(),
        email: faker.faker.internet.email(),
        password: faker.faker.internet.password(),
      });
    }

    const csvWriter = createObjectCsvWriter({
      path: 'users.csv',
      header: [
        { id: 'userId', title: 'User Id' },
        { id: 'username', title: 'Username' },
        { id: 'email', title: 'Email' },
        { id: 'password', title: 'Password' },
      ],
    });

    await csvWriter.writeRecords(data);

    console.log('Users CSV file generated successfully!');
  }

  async generateSingersCsv() {
    let data = [];

    // Generate singers data
    for (let i = 0; i < SINGERS; i++) {
      data.push({
        singerId: i,
        name: faker.faker.person.fullName(),
      });
    }

    const csvWriter = createObjectCsvWriter({
      path: 'singers.csv',
      header: [
        { id: 'singerId', title: 'Singer ID' },
        { id: 'name', title: 'Name' },
      ],
    });

    await csvWriter.writeRecords(data);

    console.log('Singers CSV file generated successfully!');
  }

  async generatePlaylistsCsv() {
    let data = [];

    // Generate playlists data
    for (let i = 0; i < PLAYLISTS; i++) {
      data.push({
        playlistId: i,
        name: faker.faker.music.songName(),
        timesPlayed: faker.faker.datatype.number({ min: 0, max: 300000 }),
        ownerId: faker.faker.datatype.number({ min: 1, max: USERS }),
      });
    }

    const csvWriter = createObjectCsvWriter({
      path: 'playlists.csv',
      header: [
        { id: 'playlistId', title: 'Playlist Id' },
        { id: 'name', title: 'Name' },
        { id: 'timesPlayed', title: 'Times Played' },
        { id: 'ownerId', title: 'Owner Id' },
      ],
    });

    await csvWriter.writeRecords(data);

    console.log('Playlists CSV file generated successfully!');
  }

  async generateSongsCsv() {
    let data = [];

    for (let i = 0; i < SONGS; i++) {
      data.push({
        songId: i,
        name: faker.faker.music.songName(),
        genre: faker.faker.music.genre(),
        timesPlayed: faker.faker.datatype.number({ min: 0, max: 300000 }),
        durationInSec: faker.faker.datatype.number({ min: 90, max: 1000 }),
      });
    }

    const csvWriter = createObjectCsvWriter({
      path: 'songs.csv',
      header: [
        { id: 'songId', title: 'ID' },
        { id: 'name', title: 'Name' },
        { id: 'genre', title: 'Genre' },
        { id: 'timesPlayed', title: 'Times Played' },
        { id: 'durationInSec', title: 'Duration in Seconds' },
      ],
    });

    await csvWriter.writeRecords(data);

    console.log('Songs CSV file generated successfully!');
  }
}

const program = new Command();
const myCsvGenerator = new CsvGenerator();
program
  .command('generate')
  .description('Generate CSV file with sample data for all tables')
  .option('output.csv')
  .action(async ({}) => {
    await myCsvGenerator.generateUsersCsv();
    await myCsvGenerator.generateSingersCsv();
    await myCsvGenerator.generatePlaylistsCsv();
    await myCsvGenerator.generateSongsCsv();
  });

program.parse(process.argv);
