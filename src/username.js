const ADJECTIVES = [
  "agile", "amber", "ancient", "brave", "brisk", "calm", "clever", "cozy", "crisp", "curious",
  "dashing", "deep", "eager", "early", "easy", "elegant", "fancy", "fierce", "fine", "fresh",
  "frosty", "gentle", "gleaming", "golden", "graceful", "grand", "green", "happy", "hardy", "hidden",
  "honest", "humble", "icy", "jolly", "joyful", "keen", "kind", "light", "lilac", "lively",
  "lofty", "lucky", "mellow", "merry", "mint", "misty", "mossy", "noble", "olive", "opal",
  "pale", "patient", "peaceful", "playful", "plum", "poised", "proud", "quick", "quiet", "radiant",
  "rapid", "raven", "regal", "russet", "sage", "sandy", "sharp", "silent", "sleek", "sleepy",
  "slick", "smooth", "soaring", "soft", "sparky", "steady", "stellar", "sturdy", "sunny", "swift",
  "tidy", "velvet", "vibrant", "warm", "willow", "wise", "witty", "zealous", "bright", "bronze",
  "cheerful", "coral", "cream", "crimson", "dusty", "emerald", "floral", "gilded", "honey", "indigo",
];

const NOUNS = [
  "antelope", "apricot", "arrow", "atlas", "aurora", "badge", "bamboo", "banyan", "basil", "beaver",
  "beacon", "berry", "blossom", "bonfire", "boulder", "brook", "bumblebee", "canyon", "cedar", "cherry",
  "cliff", "cloud", "copper", "coral", "cottage", "coyote", "crane", "cricket", "daffodil", "dune",
  "eagle", "echo", "ember", "falcon", "fern", "field", "finch", "fjord", "fox", "galaxy",
  "garland", "gazelle", "gecko", "glade", "glacier", "granite", "grove", "gull", "harbor", "hare",
  "harvest", "hawthorn", "heron", "hive", "hummingbird", "icicle", "ivory", "jasmine", "juniper", "kestrel",
  "lantern", "lighthouse", "lily", "lotus", "maple", "meadow", "meteor", "moon", "moth", "mountain",
  "oak", "orchard", "otter", "owl", "panda", "pearl", "pebble", "pine", "poppy", "prairie",
  "pumpkin", "rabbit", "rainbow", "reef", "robin", "river", "salmon", "sandstone", "sapphire", "seagull",
  "shadow", "sparrow", "spring", "squirrel", "star", "storm", "stream", "sunflower", "sunrise", "swan",
];

const SEPARATORS = {
  dash: "-",
  dot: ".",
  underscore: "_",
  none: "",
  camel: "camel",
};

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function makeUsername(sepName = "camel") {
  const sep = SEPARATORS[sepName] ?? "-";
  const adjective = pick(ADJECTIVES);
  const noun = pick(NOUNS);
  const digits = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  if (sep === "camel") {
    const cap = (w) => w[0].toUpperCase() + w.slice(1);
    return cap(adjective) + cap(noun) + digits;
  }
  return `${adjective}${sep}${noun}${sep}${digits}`;
}