const seedUsers = n => Array
  .from({ length: n })
  .map((_, i) => ({
    id: i,
    currentStreams: seedStreams()
  }));
  
const seedStreams = () => {
  const numStreams = Math.ceil(Math.random() * 3);
  const arrStreams = Array
  .from({ length: numStreams })
  .map(generateStreamId);
  return arrStreams;
}
  
const generateStreamId = () => Math.floor(Math.random() * 10000);

module.exports = seedUsers(10);