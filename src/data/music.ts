export interface MusicRelease {
    title: string;
    artist: string;
    year: string;
    format: string;
    platform: string;
    cover: string;
    youtubeUrl: string;
    youtubeEmbed: string;
    noteTr: string;
    noteEn: string;
}

export const featuredRelease: MusicRelease = {
    title: 'Agora',
    artist: 'Rêzan Mîr Uğurlu',
    year: '2020',
    format: 'Single release',
    platform: 'YouTube',
    cover: '/music/music-cover.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=fxL_ON8L5S8',
    youtubeEmbed: 'https://www.youtube-nocookie.com/embed/fxL_ON8L5S8?rel=0',
    noteTr:
        'Agora, tek bir işe odaklanan yalın bir dinleme alanı olarak ele alındı. Sayfa; kapağı, başlığı ve oynatıcıyı tek bir ritim içinde toplayarak parçanın kendi atmosferine daha fazla yer açıyor.',
    noteEn:
        'Agora is framed here as a single-release listening space. The page holds the cover, title, and player inside one restrained rhythm, leaving more room for the piece to set its own atmosphere.',
};
