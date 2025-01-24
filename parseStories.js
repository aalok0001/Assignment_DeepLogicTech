function extractStoriesSection(data) {
  const startTag = '<div class="partial latest-stories" data-module_name="Latest Stories">';
  const endTag = '<section class="homepage-section-v2 mag-subs"';

  const startIndex = data.indexOf(startTag);
  const endIndex = data.indexOf(endTag, startIndex);
  return data.substring(startIndex + startTag.length, endIndex);
}

function parseStories(storiesSection) {

  let stories = [];

  let currentIndex = 0;

  while ((currentIndex = storiesSection.indexOf('<li class="latest-stories__item">', currentIndex)) !== -1) {


      currentIndex += '<li class="latest-stories__item">'.length;

      let linkStart = storiesSection.indexOf('<a href="', currentIndex) + 9;

      let linkEnd = storiesSection.indexOf('"', linkStart);

      let link = 'https://time.com' + storiesSection.substring(linkStart, linkEnd);

      let titleStartTag = '<h3 class="latest-stories__item-headline">';

      let titleStart = storiesSection.indexOf(titleStartTag, currentIndex);

      if (titleStart !== -1) {
        
          titleStart += titleStartTag.length;
          let titleEnd = storiesSection.indexOf('</h3>', titleStart);
          let title = storiesSection.substring(titleStart, titleEnd).trim();

          if (title && link) {
              stories.push({ title, link });
          }
      }
  }

  return stories;
}

module.exports = { extractStoriesSection, parseStories };
