export interface Credit {
    role: string;
    name: string;
}

export interface Film {
    id: string;
    title: string;
    year: string;
    poster: string;
    category: string;
    synopsis: string;
    synopsisEn: string;
    directorStatement?: string;
    directorStatementEn?: string;
    vimeoId?: string;
    festivals: string[];
    credits: Credit[];
    stills: string[];
}

export const films: Film[] = [
    {
        id: '36',
        title: '36',
        year: '2023',
        poster: '/films/36.webp',
        category: 'Short Film',
        vimeoId: '913686113',
        synopsis:
            "36, 1980'lerde Fransa'da nükleer bir santral için oluşturulmuş tanıtım kataloğunun diapozitif fotoğraf karelerinden oluşur. Katalogdaki otuz altı karenin otuz beşiyle geçmiş, bugün ve gelecek arasında bir diyalog kurulur. Film, enstitünün içerisinde gezintiye çıkarırken merkezine sadece hisleri alır.",
        synopsisEn:
            "36 is composed of diapositives taken from a promotional catalog created in the 1980s for a nuclear power plant in France. Through thirty-five of the catalog's thirty-six frames, a dialogue is established between the past, the present, and the future. As the film wanders through the institute, it places emotions at its very center.",
        festivals: [
            'İstanbul Uluslararası Film Festivali – Ulusal Kısa Yarışma (İKSV) (2024)',
            'LogoLobo Fest - Festival Internacional de Filmes (2023)',
            '11. Bozcaada Uluslararası Ekolojik Belgesel Festivali (2024)',
            'Istanbul International Experimental Film Festival (2024)',
            'DAFF (2024)',
            'Izmir International Short Film Festival (2024)',
            'Avrupa Birliği İnsan Hakları Kısa Film Yarışması (2023)',
            'İstanbul Tıp Fakültesi Kısa Film Günleri (2024)',
            'İstanbul Modern Müzesi Kısa Film Günleri (2024)',
            'Bodrum Gümüşlük Film Akademisi (2024)',
            '36. Münih Türk Film Günleri (2005)',
            'Yapı Kredi Kültür Sanat – Bir de Buradan Bak (2025)',
            'İFSAK Kısa Film Festivali (2025)',
            'Fenerbahçe Üniversitesi Kısa Film Festivali (2025)',
            'Siciliambiente Film Festival (2025)',
            '9. Film Amed Belgesel Film Festivali (2025)',
        ],
        credits: [
            { role: 'Director & Screenplay', name: 'Rezan Mir Uğurlu' },
            { role: 'Editor & Voiced', name: 'Gamze Terra' },
            { role: 'Producers', name: 'Rezan Mir Uğurlu – Gamze Terra' },
        ],
        stills: ['/films/stills/36-still-1.webp', '/films/stills/36-still-2.webp'],
    },
    {
        id: 'stoppani',
        title: 'Stoppani',
        year: '2022',
        poster: '/films/stoppani.webp',
        category: 'Documentary',
        vimeoId: '819934590',
        synopsis:
            'Kentler de tıpkı canlılar gibi doğar, büyür ve ölür. Stoppani, yaşlı bir kentin ölmeye yakın anlarına dair bir portredir. Kentlerin geçirdiği ağır dönüşümü insanı aradan çıkarıp sorgular. Gezegendeki insan varlığının, ancak insanların yokluğundan sonra fark edileceği düşüncesi bu kent hafızası çalışmasını doğurdu.',
        synopsisEn:
            "Cities, much like living beings, are born, grow, and die. Stoppani is a portrait of an aging city in its final moments before death. It questions the profound transformation of cities by removing the human element from the equation. The idea that humanity's presence on the planet will only be truly recognized after its absence gave rise to this exploration of urban memory.",
        festivals: [
            '15. İstanbul Documentarist Belgesel Film Günleri (2022)',
            'Filmreihe Tüpisch Türkisch Cologne (2023)',
            'Avrupa Birliği 13. İnsan Hakları Film Festivali (2023)',
        ],
        credits: [
            { role: 'Director', name: 'Rezan Mir Uğurlu' },
            { role: 'Cinematography', name: 'Rezan Mir Uğurlu' },
            { role: 'Editing', name: 'Gamze Terra' },
            { role: 'Producers', name: 'Gamze Terra & Rezan Mir Uğurlu' },
            { role: 'Music', name: 'Sanr' },
        ],
        stills: [
            '/films/stills/stoppani-still-1.webp',
            '/films/stills/stoppani-still-2.webp',
        ],
    },
    {
        id: 'idyma',
        title: 'IDYMA',
        year: '2023',
        poster: '/films/idyma.webp',
        category: 'Short Film',
        vimeoId: '859991107',
        synopsis:
            'Idyma, Akdeniz kıyısında sessiz bir antik kentte geçmişin izlerini takip ediyor. Nehir ve deniz arasında dolaşan film, yıpranmış kentin formuyla uyumlu olarak görüntüleri sürekli hareket ettirerek zamansız bir atmosfer yaratıyor.',
        synopsisEn:
            "Idyma traces the echoes of the past in a quiet ancient city on the Mediterranean coast. Moving between river and sea, the film's constantly shifting images mirror the city's worn forms, creating a timeless atmosphere.",
        festivals: [],
        credits: [
            { role: 'Camera & Editing', name: 'Rezan Mir Uğurlu' },
        ],
        stills: ['/films/stills/idyma-still-1.webp'],
    },
    {
        id: 'rec',
        title: 'REC',
        year: '2022',
        poster: '/films/rec.webp',
        category: 'Short Film',
        vimeoId: '819931276',
        synopsis:
            "Koyun sürülerinin çokluğuyla bilinen bir kıyı köyüne, sürülerin hareketini kayıt altına almak üzere köye giden çekim ekibi kameranın başından bir süreliğine ayrılır. Onların ayrılmasıyla kameranın başka ziyaretçileri olacaktır.",
        synopsisEn:
            'In a coastal village known for its abundance of sheep flocks, a film crew arrives to document the movement of the herds. At one point, the crew steps away from the camera, leaving it unattended. During their absence, the camera receives other visitors.',
        directorStatement:
            "Kamera kısa bir süreliğine de olsa yalnız bırakılırsa ne olur? Rec, sinemanın sınırlarını kayıt altında incelemeye çalışıyor. Direkt ham kayıttan, plansız ve müdahalesiz bir şekilde bir kaydın sonunun nerelere varabileceğine dair bir gözlem, inceleme. Bir kayıtın film olması için nelere ihtiyacı vardır? Her kayıt bir film midir? Rec bir çok soruyu izleyicinin önüne müdahalesiz bir şekilde sunmayı hedefliyor.",
        directorStatementEn:
            "What happens when a camera is left alone, even for a short while? Rec seeks to explore the boundaries of cinema through the act of recording itself. It is an observation—raw, unplanned, and unmanipulated—of how far a simple recording can go. What does a recording need in order to become a film? Is every recording a film? Rec aims to present these questions to the audience without interference.",
        festivals: [
            '16. İstanbul Documentarist Belgesel Film Günleri (2023)',
            'Amed 2. Ekolojik Film Günleri (2023)',
            'Amsterdam Kürt Filmleri Festivali AKFF (2023)',
        ],
        credits: [
            { role: 'Director', name: 'Rezan Mir Uğurlu' },
            { role: 'Camera', name: 'Rezan Mir Uğurlu' },
            { role: 'Producers', name: 'Gamze Terra - Rezan Mir Uğurlu' },
            { role: 'Editor', name: 'Gamze Terra' },
        ],
        stills: ['/films/stills/rec-still-1.webp'],
    },
];
