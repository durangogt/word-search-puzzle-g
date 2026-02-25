export interface WordTheme {
  id: string;
  name: string;
  description: string;
  words: string[];
  icon: string;
}

export const wordThemes: WordTheme[] = [
  {
    id: 'animals',
    name: 'Animals',
    description: 'Wild and domestic creatures',
    icon: '🦁',
    words: ['LION', 'TIGER', 'ELEPHANT', 'GIRAFFE', 'ZEBRA', 'MONKEY', 'PENGUIN', 'DOLPHIN', 'EAGLE', 'BUTTERFLY', 'KANGAROO', 'PANDA']
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Games and athletics',
    icon: '⚽',
    words: ['SOCCER', 'BASKETBALL', 'TENNIS', 'BASEBALL', 'FOOTBALL', 'HOCKEY', 'GOLF', 'SWIMMING', 'RUNNING', 'CYCLING', 'BOXING', 'SURFING']
  },
  {
    id: 'food',
    name: 'Food',
    description: 'Delicious treats and meals',
    icon: '🍕',
    words: ['PIZZA', 'BURGER', 'PASTA', 'SUSHI', 'TACO', 'SALAD', 'SOUP', 'CHICKEN', 'SANDWICH', 'CHOCOLATE', 'COOKIE', 'APPLE']
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'The great outdoors',
    icon: '🌲',
    words: ['TREE', 'FLOWER', 'RIVER', 'MOUNTAIN', 'OCEAN', 'FOREST', 'DESERT', 'CLOUD', 'RAINBOW', 'WATERFALL', 'SUNSET', 'BEACH']
  },
  {
    id: 'space',
    name: 'Space',
    description: 'Cosmic wonders',
    icon: '🚀',
    words: ['PLANET', 'STAR', 'MOON', 'ROCKET', 'GALAXY', 'COMET', 'ASTEROID', 'ASTRONAUT', 'ORBIT', 'TELESCOPE', 'SATURN', 'NEBULA']
  },
  {
    id: 'colors',
    name: 'Colors',
    description: 'Rainbow of hues',
    icon: '🎨',
    words: ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE', 'PINK', 'BROWN', 'BLACK', 'WHITE', 'GRAY', 'VIOLET']
  },
  {
    id: 'weather',
    name: 'Weather',
    description: 'Climate and conditions',
    icon: '⛈️',
    words: ['SUNNY', 'RAINY', 'CLOUDY', 'STORMY', 'WINDY', 'SNOWY', 'FOGGY', 'THUNDER', 'LIGHTNING', 'RAINBOW', 'HAIL', 'FROST']
  },
  {
    id: 'music',
    name: 'Music',
    description: 'Instruments and sounds',
    icon: '🎵',
    words: ['PIANO', 'GUITAR', 'DRUMS', 'VIOLIN', 'TRUMPET', 'FLUTE', 'SAXOPHONE', 'HARP', 'MELODY', 'RHYTHM', 'HARMONY', 'SONG']
  },
  {
    id: 'ocean',
    name: 'Ocean',
    description: 'Life under the sea',
    icon: '🌊',
    words: ['WHALE', 'SHARK', 'DOLPHIN', 'OCTOPUS', 'STARFISH', 'CRAB', 'JELLYFISH', 'CORAL', 'SEAHORSE', 'TURTLE', 'CLOWNFISH', 'SEAL']
  },
  {
    id: 'vehicles',
    name: 'Vehicles',
    description: 'Transportation modes',
    icon: '🚗',
    words: ['CAR', 'TRUCK', 'TRAIN', 'PLANE', 'BOAT', 'BICYCLE', 'MOTORCYCLE', 'HELICOPTER', 'SUBMARINE', 'ROCKET', 'SCOOTER', 'BUS']
  },
  {
    id: 'fruits',
    name: 'Fruits',
    description: 'Fresh and juicy',
    icon: '🍎',
    words: ['APPLE', 'BANANA', 'ORANGE', 'GRAPE', 'MANGO', 'STRAWBERRY', 'PINEAPPLE', 'WATERMELON', 'PEACH', 'CHERRY', 'KIWI', 'LEMON']
  },
  {
    id: 'countries',
    name: 'Countries',
    description: 'Places around the world',
    icon: '🌍',
    words: ['FRANCE', 'JAPAN', 'BRAZIL', 'CANADA', 'EGYPT', 'ITALY', 'INDIA', 'MEXICO', 'SPAIN', 'CHINA', 'GERMANY', 'AUSTRALIA']
  }
];
