import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// push content
export const putDb = async (content) => {
  console.log("PUT to the database");

  const contactDb = await openDB("jate", 1);

  const text = contactDb.transaction("jate", "readwrite");

  const store = text.objectStore("jate");

  const request = store.add({ content });

  const result = await request;
  console.log("result.value", result);
  return result;
};// export
export const getDb = async () => {
  console.log("GET from the database");

  const contactDb = await openDB("jate", 1);

  const text = contactDb.transaction("jate", "readonly");

  const store = text.objectStore("jate");

  const request = store.getAll();

  const result = await request;
  console.log("result.value", result);
  const recentContent = result[result.length - 1].content;
  console.log("recentContent", recentContent);
  return recentContent;
};
initdb();
