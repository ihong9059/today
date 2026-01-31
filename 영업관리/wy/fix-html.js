const fs = require('fs');
const path = 'C:/todo/today/wy/android-app/app/src/main/assets/index.html';
let content = fs.readFileSync(path, 'utf8');

// Add getPhotoUrl function after getCategoryName
const funcToAdd = `

        function getPhotoUrl(photo) {
            if (!photo) return '';
            if (photo.startsWith('/')) return serverUrl + photo;
            return serverUrl + '/uploads/' + photo;
        }`;

content = content.replace(
  "return names[cat] || cat;\n        }",
  "return names[cat] || cat;\n        }" + funcToAdd
);

// Replace photo URL usages in result list
content = content.replace(
  '${serverUrl}${item.photo}',
  '${getPhotoUrl(item.photo)}'
);

// Replace photo URL usage in detail view
content = content.replace(
  '`<img class="detail-image" src="${serverUrl}${item.photo}">`',
  '`<img class="detail-image" src="${getPhotoUrl(item.photo)}">`'
);

fs.writeFileSync(path, content);
console.log('Done');
