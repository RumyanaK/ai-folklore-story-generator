import { promises as fs } from "fs";
import path from "path";

const COUNTER_PATH = path.join(process.cwd(), "data", "counter.json");

type CounterData = {
  stories_created: number;
};

async function readCounterFile(): Promise<CounterData> {
  try {
    const raw = await fs.readFile(COUNTER_PATH, "utf-8");
    const data = JSON.parse(raw) as CounterData;

    // fallback защита
    return {
      stories_created:
        typeof data.stories_created === "number" ? data.stories_created : 0,
    };
  } catch {
    // ако файлът липсва/е счупен — създаваме наново
    const initial: CounterData = { stories_created: 0 };
    await fs.mkdir(path.dirname(COUNTER_PATH), { recursive: true });
    await fs.writeFile(COUNTER_PATH, JSON.stringify(initial, null, 2), "utf-8");
    return initial;
  }
}

async function writeCounterFile(data: CounterData) {
  // пишем атомарно: първо temp файл, после rename
  const tmpPath = COUNTER_PATH + ".tmp";
  await fs.writeFile(tmpPath, JSON.stringify(data, null, 2), "utf-8");
  await fs.rename(tmpPath, COUNTER_PATH);
}

export async function getStoriesCreated(): Promise<number> {
  const data = await readCounterFile();
  return data.stories_created;
}

export async function incrementStoriesCreated(): Promise<number> {
  const data = await readCounterFile();
  data.stories_created += 1;
  await writeCounterFile(data);
  return data.stories_created;
}
