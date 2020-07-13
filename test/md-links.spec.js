const mdLinks = require('../index.js');

describe('mdLinks', () => {

  it('should be a function', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('should return an error if it doesnt find a .md file', () => {
    return expect(mdLinks('./index.js')).rejects.toEqual('.md file not found');
  });

  it('should return an error if no links are found within the file', () => {
    return expect(mdLinks('./test/mockNoLinks.md')).rejects.toEqual('No links here!');
  });

  it('should return an error if it doesnt find .md files in the directory', () => {
    return expect(mdLinks('./directory')).rejects.toEqual('.md files not found in this directory');
  });

  it('should return an link if found a .md file', () => {
    return expect(mdLinks('./test/mockLinks.md')).resolves.toEqual([
      {
        file: './test/mockLinks.md',
        text: 'Github',
        href: 'https://github.com/',
      },
      {
        file: './test/mockLinks.md',
        text: 'Youtube',
        href: 'https://www.youtube.com/',
      },
    ]);
  });
});