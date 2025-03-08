export const challenges = [
    {
      id: 1,
      title: "Pacifist Run - The Legend of Zelda: Breath of the Wild",
      description: "Complétez le jeu sans tuer d'ennemis.",
      rules: "Évitez les combats en utilisant uniquement la furtivité.",
      gameId: 1,
      categoryId: 1,
      difficultyId: 3,
      userId: 1,
      votes: [
        { id: 1, userId: 2, score: 4 },
        { id: 2, userId: 3, score: 5 },
        { id: 21, userId: 4, score: 3 },
        { id: 22, userId: 5, score: 1 }
      ],
      runs: [
        {
          id: 1,
          success: "https://www.youtube.com/watch?v=t-iHmXe8v3s&t=564s",
          userId: 1,
          votes: [{ id: 11, userId: 3, score: 4 }, { id: 41, userId: 2, score: 4 }]
        },
        {
          id: 2,
          success: "https://www.youtube.com/watch?v=dI_6eCK3Gto",
          userId: 4,
          votes: [{ id: 12, userId: 1, score: 5 }, { id: 42, userId: 3, score: 4 }, { id: 43, userId: 2, score: 4 }]
        },
        {
          id: 3,
          success: "https://www.youtube.com/watch?v=Z0yJvh1zL50",
          userId: 3,
          votes: [{ id: 13, userId: 5, score: 4 }, { id: 44, userId: 2, score: 1 }, { id: 45, userId: 3, score: 4 }, { id: 46, userId: 4, score: 2 }]
        }
      ]
    },
    {
      id: 2,
      title: "Speedrun - Super Mario Odyssey",
      description: "Terminez le jeu aussi rapidement que possible.",
      rules: "Optimisez chaque mouvement et évitez toutes les distractions.",
      gameId: 2,
      categoryId: 2,
      difficultyId: 2,
      userId: 2,
      votes: [
        { id: 3, userId: 1, score: 5 },
        { id: 4, userId: 3, score: 4 },
        { id: 23, userId: 4, score: 5 },
        { id: 24, userId: 5, score: 3}
      ],
      runs: [
        {
          id: 4,
          success: "https://www.youtube.com/watch?v=KOhxq29vGiE",
          userId: 2,
          votes: [{ id: 14, userId: 4, score: 5 }]
        },
        {
          id: 5,
          success: "https://www.youtube.com/watch?v=a5JvBtp8ewo",
          userId: 1,
          votes: [{ id: 15, userId: 5, score: 3 }]
        },
        {
          id: 6,
          success: "https://www.youtube.com/watch?v=gC_jm3uVrI0",
          userId: 3,
          votes: [{ id: 16, userId: 4, score: 4 }]
        }
      ]
    },
    {
      id: 3,
      title: "100% Completion - Red Dead Redemption 2",
      description: "Complétez toutes les missions et trouvez tous les objets collectables.",
      rules: "Finissez toutes les quêtes secondaires et explorez le monde pour trouver tous les secrets.",
      gameId: 3,
      categoryId: 3,
      difficultyId: 3,
      userId: 1,
      votes: [
        { id: 5, userId: 4, score: 5 },
        { id: 6, userId: 2, score: 4 },
        { id: 25, userId: 1, score: 2 },
        { id: 26, userId: 5, score: 3 }
      ],
      runs: [
        {
          id: 7,
          success: "https://www.youtube.com/watch?v=wyqI5bgNkd0",
          userId: 4,
          votes: [{ id: 17, userId: 2, score: 5 }]
        },
        {
          id: 8,
          success: "https://www.youtube.com/watch?v=S3Ys0J-nOP45",
          userId: 3,
          votes: [{ id: 18, userId: 5, score: 4 }]
        },
        {
          id: 9,
          success: "https://www.youtube.com/watch?v=ViEfHNoedvA",
          userId: 2,
          votes: [{ id: 19, userId: 1, score: 5 }]
        }
      ]
    },
    {
      id: 4,
      title: "No Damage - God of War",
      description: "Complétez le jeu sans subir de dégâts.",
      rules: "Évitez tous les ennemis et soyez stratégique dans chaque combat.",
      gameId: 4,
      categoryId: 4,
      difficultyId: 4,
      userId: 5,
      votes: [
        { id: 7, userId: 3, score: 5 },
        { id: 8, userId: 2, score: 4 },
        { id: 27, userId: 4, score: 3 },
        { id: 28, userId: 1, score: 3 }
      ],
      runs: [
        {
          id: 10,
          success: "https://www.youtube.com/watch?v=Xf2O0ZPStCU",
          userId: 5,
          votes: [{ id: 20, userId: 1, score: 4 }, {id: 41, userId: 2, score: 3 }, {id: 42, userId: 4, score: 5 }]
        },
        {
          id: 11,
          success: "https://www.youtube.com/watch?v=yi4gMHfGzik&list=PLtNjbM6SrnmLEBR1LL5oXKOg5-tctxQIS",
          userId: 2,
          votes: [{ id: 21, userId: 4, score: 5 }, {id: 43, userId: 2, score: 5 }, {id: 44, userId: 5, score: 3 }]
        },
        {
          id: 12,
          success: "https://www.youtube.com/watch?v=a8l0thpgSvo",
          userId: 3,
          votes: [{ id: 22, userId: 5, score: 4 }, {id: 45, userId: 2, score: 4 }, {id: 46, userId: 4, score: 1 }]
        }
      ]
    },
    {
      id: 5,
      title: "Permadeath - The Witcher 3: Wild Hunt",
      description: "Complétez le jeu sans mourir.",
      rules: "Ne laissez aucune place à l'erreur, chaque combat peut être fatal.",
      gameId: 5,
      categoryId: 7,
      difficultyId: 5,
      userId: 4,
      votes: [
        { id: 9, userId: 2, score: 5 },
        { id: 10, userId: 1, score: 4 },
        { id: 29, userId: 3, score: 2 },
        { id: 30, userId: 5, score: 1 }
      ],
      runs: [
        {
          id: 13,
          success: "https://www.youtube.com/watch?v=7VG7Oluf2NI&list=PLzPXzkdWExxYbbcFDUL6BL3O9k6NYDrUH",
          userId: 4,
          votes: [{ id: 23, userId: 3, score: 5 }]
        },
        {
          id: 14,
          success: "https://www.youtube.com/watch?v=hOFoNBtz59k&list=PLQv8n77hxgtVQnluBMBuzEH-0H75M2ew3",
          userId: 1,
          votes: [{ id: 24, userId: 2, score: 4 }]
        },
        {
          id: 15,
          success: "https://www.youtube.com/watch?v=ynX5fQQ1jg4&list=PLN39y5i_H0Fn-aZEAQjUBtjDhGQPfmm7U",
          userId: 5,
          votes: [{ id: 25, userId: 4, score: 5 }]
        }
      ]
    },
    {
      id: 6,
      title: "Exploration - Minecraft",
      description: "Explorez tous les biomes et trouvez tous les secrets du monde.",
      rules: "Découvrez chaque région, trouvez des structures rares et explorez chaque recoin du monde.",
      gameId: 6,
      categoryId: 19,
      difficultyId: 2,
      userId: 2,
      votes: [
        { id: 11, userId: 1, score: 4 },
        { id: 12, userId: 3, score: 2 },
        { id: 31, userId: 4, score: 1 },
        { id: 32, userId: 5, score: 1 }
      ],
      runs: [
        {
          id: 16,
          success: "https://www.youtube.com/watch?v=E3t24Urba6Y",
          userId: 2,
          votes: [{ id: 26, userId: 4, score: 4 }]
        },
        {
          id: 17,
          success: "https://www.youtube.com/watch?v=WPL56SkFTro",
          userId: 3,
          votes: [{ id: 27, userId: 1, score: 5 }]
        },
        {
          id: 18,
          success: "https://www.youtube.com/watch?v=u7kdVe8q5zs",
          userId: 4,
          votes: [{ id: 28, userId: 5, score: 4 }]
        }
      ]
    },
    {
      id: 7,
      title: "Survivor - Monster Hunter Wilds",
      description: "Survivez le plus longtemps possible contre des vagues d'ennemis de plus en plus puissants.",
      rules: "Ne mourrez pas et affrontez les vagues sans échapper à aucun combat.",
      gameId: 7,
      categoryId: 10,
      difficultyId: 5,
      userId: 3,
      votes: [
        { id: 13, userId: 4, score: 5 },
        { id: 14, userId: 2, score: 4 },
        { id: 33, userId: 1, score: 1 },
        { id: 34, userId: 5, score: 2 }
      ],
      runs: [
        {
          id: 19,
          success: "https://www.youtube.com/watch?v=UmEdarY2zpU",
          userId: 3,
          votes: [{ id: 29, userId: 1, score: 4 }]
        },
        {
          id: 20,
          success: "https://www.youtube.com/watch?v=MrwzSFflqBQ",
          userId: 1,
          votes: [{ id: 30, userId: 5, score: 5 }]
        },
        {
          id: 21,
          success: "https://www.youtube.com/watch?v=zfVwaSiSaPw",
          userId: 5,
          votes: [{ id: 31, userId: 2, score: 4 }]
        }
      ]
    },
    {
      id: 8,
      title: "No HUD - Uncharted: The Nathan Drake Collection",
      description: "Complétez le jeu sans l'affichage à l'écran.",
      rules: "N'utilisez pas le HUD, comme la barre de santé ou les munitions.",
      gameId: 8,
      categoryId: 20,
      difficultyId: 4,
      userId: 4,
      votes: [
        { id: 15, userId: 1, score: 5 },
        { id: 16, userId: 3, score: 4 },
        { id: 35, userId: 2, score: 5 },
        { id: 36, userId: 5, score: 1 }
      ],
      runs: [
        {
          id: 22,
          success: "https://www.youtube.com/watch?v=l3Hn5n0R_Ok",
          userId: 4,
          votes: [{ id: 32, userId: 2, score: 5 }]
        },
        {
          id: 23,
          success: "https://www.youtube.com/watch?v=QaFKukn0a6g",
          userId: 5,
          votes: [{ id: 33, userId: 3, score: 4 }]
        },
        {
          id: 24,
          success: "https://www.youtube.com/watch?v=wEpEIynGdLI",
          userId: 3,
          votes: [{ id: 34, userId: 4, score: 5 }]
        }
      ]
    },
    {
      id: 9,
      title: "Glitchless - Cyberpunk 2077",
      description: "Terminez le jeu sans utiliser de glitchs.",
      rules: "Évitez toutes les méthodes de glitch et terminez le jeu normalement.",
      gameId: 9,
      categoryId: 18,
      difficultyId: 3,
      userId: 2,
      votes: [
        { id: 17, userId: 1, score: 5 },
        { id: 18, userId: 3, score: 4 },
        { id: 37, userId: 4, score: 4 },
        { id: 38, userId: 5, score: 1 }
      ],
      runs: [
        {
          id: 25,
          success: "https://www.youtube.com/watch?v=GiQIJ4cBCV8",
          userId: 5,
          votes: [{ id: 35, userId: 3, score: 5 }]
        },
        {
          id: 26,
          success: "https://www.youtube.com/watch?v=9pb9wdLSOv8",
          userId: 3,
          votes: [{ id: 36, userId: 2, score: 4 }]
        },
        {
          id: 27,
          success: "https://www.youtube.com/watch?v=cvVNe-wpvvg",
          userId: 4,
          votes: [{ id: 37, userId: 5, score: 5 }]
        }
      ]
    },
    {
      id: 10,
      title: "100% Completion - Kingdom Hearts",
      description: "Complétez toutes les missions et trouvez tous les objets collectables.",
      rules: "Finissez toutes les quêtes secondaires et collectez tous les objets du jeu.",
      gameId: 10,
      categoryId: 3,
      difficultyId: 3,
      userId: 4,
      votes: [],
      runs: [
        {
          id: 28,
          success: "https://www.youtube.com/watch?v=T6hPZ3J04_o",
          userId: 4,
          votes: []
        },
        {
          id: 29,
          success: "https://www.youtube.com/watch?v=NHLe2qgg_3g",
          userId: 3,
          votes: [{ id: 39, userId: 2, score: 4 }]
        },
        {
          id: 30,
          success: "https://www.youtube.com/watch?v=nW_YFiIXuNU",
          userId: 2,
          votes: [{ id: 40, userId: 4, score: 5 }]
        }
      ]
    }
  ];
  