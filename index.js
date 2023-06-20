import fs from 'fs'
import https from 'https';


export function getFromVideoId(videoId) {
    const subtitleUrl = `https://www.youtube.com/api/timedtext?lang=th&v=${videoId}`;

    https.get(subtitleUrl, (response) => {
        let subtitleText = '';

        response.on('data', (chunk) => {
            subtitleText += chunk;
        });

        response.on('end', () => {
            const fileName = 'subtitle.txt';
            fs.writeFile(fileName, subtitleText, (err) => {
                if (err) {
                    console.error('Error saving subtitle:', err);
                } else {
                    console.log('Subtitle downloaded successfully!');
                }
            });
        });
    }).on('error', (err) => {
        console.error('Error fetching subtitle:', err);
    });
}
