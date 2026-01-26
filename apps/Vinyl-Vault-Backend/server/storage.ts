import { randomUUID } from "crypto";
import type { Vinyl, InsertVinyl, OnlineSettings, Shop, NetworkListing, NetworkListingWithShop, Message, MessageThread, InsertMessage, VinylFormat, SalesOrder, SalesLineItem, SalesStats, SalesChannel, InsertSalesOrder } from "../shared/schema";

export interface IStorage {
  getAllVinyls(): Promise<Vinyl[]>;
  getVinylById(id: string): Promise<Vinyl | undefined>;
  createVinyl(vinyl: InsertVinyl): Promise<Vinyl>;
  updateVinyl(id: string, vinyl: Partial<InsertVinyl>): Promise<Vinyl | undefined>;
  deleteVinyl(id: string): Promise<boolean>;
  markSold(id: string): Promise<Vinyl | undefined>;
  updateOnlineSettings(id: string, settings: OnlineSettings): Promise<Vinyl | undefined>;
  
  // Network feature
  getAllShops(): Promise<Shop[]>;
  getShopById(id: string): Promise<Shop | undefined>;
  getAllNetworkListings(): Promise<NetworkListingWithShop[]>;
  getNetworkListingById(id: string): Promise<NetworkListingWithShop | undefined>;
  getMyNetworkListings(): Promise<NetworkListing[]>;
  createNetworkListing(vinylId: string): Promise<NetworkListing>;
  removeNetworkListing(id: string): Promise<boolean>;
  
  // Messaging
  getOrCreateMessageThread(shopId: string, networkListingId: string): Promise<MessageThread>;
  sendMessage(data: InsertMessage): Promise<Message>;
  
  // Sales
  getAllSalesOrders(options?: { startDate?: string; endDate?: string; search?: string }): Promise<SalesOrder[]>;
  getSalesOrderById(id: string): Promise<SalesOrder | undefined>;
  getAllSalesLineItems(options?: { startDate?: string; endDate?: string; search?: string }): Promise<(SalesLineItem & { order: SalesOrder })[]>;
  getSalesStats(range: '7' | '30' | '90' | 'all'): Promise<SalesStats>;
  createSalesOrder(data: InsertSalesOrder): Promise<SalesOrder>;
}

const seedData: InsertVinyl[] = [
  {
    artist: "Pink Floyd",
    releaseTitle: "The Dark Side of the Moon",
    label: "Harvest",
    catalogNumber: "SHVL 804",
    format: "LP",
    countryOfRelease: "UK",
    yearOfRelease: "1973",
    editionNotes: "First UK pressing",
    mediaGrade: "Very Good Plus (VG+)",
    sleeveGrade: "Very Good (VG)",
    playTested: true,
    playbackIssues: false,
    originalInnerSleeveIncluded: true,
    originalInsertsIncluded: true,
    seamSplitsPresent: false,
    price: "$150.00",
    inStore: true,
    online: true,
    holdForCustomer: false,
    quantity: 1,
    location: "Shelf 1",
    marketplaces: ["Discogs", "eBay"],
    status: "active",
    onlineSettings: {
      listingDescription: "Original UK pressing in great condition",
      sku: "PF-DSOTM-001",
      perMarketplace: {
        Discogs: { status: "active" },
        eBay: { status: "active", priceOverride: "$165.00" }
      }
    }
  },
  {
    artist: "The Beatles",
    releaseTitle: "Abbey Road",
    label: "Apple Records",
    catalogNumber: "PCS 7088",
    format: "LP",
    countryOfRelease: "UK",
    yearOfRelease: "1969",
    editionNotes: "Original pressing",
    mediaGrade: "Very Good (VG)",
    sleeveGrade: "Good Plus (G+)",
    playTested: true,
    playbackIssues: false,
    warpPresent: false,
    originalInnerSleeveIncluded: false,
    price: "$85.00",
    inStore: true,
    online: false,
    holdForCustomer: false,
    quantity: 2,
    location: "Bin A",
    marketplaces: [],
    status: "active",
  },
  {
    artist: "Daft Punk",
    releaseTitle: "Random Access Memories",
    label: "Columbia",
    catalogNumber: "88883716861",
    format: "LP",
    countryOfRelease: "EU",
    yearOfRelease: "2013",
    editionNotes: "180g pressing",
    mediaGrade: "Near Mint (NM)",
    sleeveGrade: "Near Mint (NM)",
    playTested: false,
    sealedCopy: true,
    shrinkOriginal: true,
    price: "$45.00",
    inStore: false,
    online: true,
    holdForCustomer: false,
    quantity: 1,
    location: "New Arrivals",
    marketplaces: ["Discogs"],
    status: "active",
    onlineSettings: {
      listingTitleOverride: "Daft Punk - RAM - SEALED 180g",
      sku: "DP-RAM-001",
      perMarketplace: {
        Discogs: { status: "active" }
      }
    }
  },
  {
    artist: "Miles Davis",
    releaseTitle: "Kind of Blue",
    label: "Columbia",
    catalogNumber: "CL 1355",
    format: "LP",
    countryOfRelease: "US",
    yearOfRelease: "1959",
    editionNotes: "Six-eye label mono",
    matrixRunoutSideA: "XLP 41657",
    matrixRunoutSideB: "XLP 41658",
    masteringIdentifiersPresent: true,
    mediaGrade: "Very Good Plus (VG+)",
    sleeveGrade: "Very Good Plus (VG+)",
    playTested: true,
    playbackIssues: false,
    originalInnerSleeveIncluded: true,
    price: "$275.00",
    inStore: true,
    online: true,
    holdForCustomer: true,
    quantity: 1,
    location: "Featured",
    marketplaces: ["eBay", "Discogs"],
    status: "active",
    onlineSettings: {
      listingDescription: "Rare six-eye mono pressing",
      sku: "MD-KOB-001",
      shippingProfileName: "Premium Vinyl",
      perMarketplace: {
        eBay: { status: "active", priceOverride: "$295.00" },
        Discogs: { status: "active" }
      }
    }
  },
  {
    artist: "Fleetwood Mac",
    releaseTitle: "Rumours",
    label: "Warner Bros.",
    catalogNumber: "BSK 3010",
    format: "LP",
    countryOfRelease: "US",
    yearOfRelease: "1977",
    mediaGrade: "Good Plus (G+)",
    sleeveGrade: "Good (G)",
    playTested: true,
    playbackIssues: true,
    playbackNotes: "Light surface noise on side A",
    warpPresent: true,
    warpAffectsPlay: false,
    seamSplitsPresent: true,
    writingOrStickersOnSleeveOrLabels: true,
    sellerNotes: "Play copy, priced accordingly",
    price: "$15.00",
    inStore: true,
    online: false,
    holdForCustomer: false,
    quantity: 1,
    location: "Bin B",
    marketplaces: [],
    status: "active",
  },
];

// Seed data for shops
const shopSeedData: Omit<Shop, "id">[] = [
  { name: "Vinyl Paradise", phone: "(555) 123-4567", email: "info@vinylparadise.com" },
  { name: "Groove Records", phone: "(555) 234-5678", email: "sales@grooverecords.com" },
  { name: "Spin City Vinyl", phone: "(555) 345-6789", email: "contact@spincityvinyl.com" },
  { name: "Wax Trax Records", phone: "(555) 456-7890", email: "orders@waxtrax.com" },
  { name: "Record Emporium", phone: "(555) 567-8901", email: "hello@recordemporium.com" },
  { name: "Dusty Grooves", phone: "(555) 678-9012", email: "info@dustygrooves.com" },
  { name: "Analog Dreams", phone: "(555) 789-0123", email: "shop@analogdreams.com" },
  { name: "The Record Exchange", phone: "(555) 890-1234", email: "trade@recordexchange.com" },
  { name: "Vintage Vinyl Co", phone: "(555) 901-2345", email: "support@vintagevinylco.com" },
  { name: "Sound Garden Records", phone: "(555) 012-3456", email: "music@soundgardenrecords.com" },
];

// Network listing seed data templates
const networkListingTemplates: Omit<NetworkListing, "id" | "shopId" | "createdAt">[] = [
  { artist: "Led Zeppelin", releaseTitle: "Led Zeppelin IV", label: "Atlantic", catalogNumber: "SD 7208", format: "LP", price: "$120.00" },
  { artist: "Nirvana", releaseTitle: "Nevermind", label: "DGC", catalogNumber: "DGC-24425", format: "LP", price: "$85.00" },
  { artist: "The Clash", releaseTitle: "London Calling", label: "CBS", catalogNumber: "CLASH 3", format: "LP", price: "$95.00" },
  { artist: "David Bowie", releaseTitle: "The Rise and Fall of Ziggy Stardust", label: "RCA Victor", catalogNumber: "LSP-4702", format: "LP", price: "$150.00" },
  { artist: "Radiohead", releaseTitle: "OK Computer", label: "Parlophone", catalogNumber: "7243 8 55229 1 9", format: "LP", price: "$75.00" },
  { artist: "The Velvet Underground", releaseTitle: "The Velvet Underground & Nico", label: "Verve", catalogNumber: "V6-5008", format: "LP", price: "$280.00" },
  { artist: "Prince", releaseTitle: "Purple Rain", label: "Warner Bros.", catalogNumber: "25110-1", format: "LP", price: "$55.00" },
  { artist: "Michael Jackson", releaseTitle: "Thriller", label: "Epic", catalogNumber: "QE 38112", format: "LP", price: "$45.00" },
  { artist: "Talking Heads", releaseTitle: "Remain in Light", label: "Sire", catalogNumber: "SRK 6095", format: "LP", price: "$65.00" },
  { artist: "Joy Division", releaseTitle: "Unknown Pleasures", label: "Factory", catalogNumber: "FACT 10", format: "LP", price: "$180.00" },
  { artist: "Kraftwerk", releaseTitle: "Trans-Europe Express", label: "Kling Klang", catalogNumber: "1C 064-82 306", format: "LP", price: "$90.00" },
  { artist: "Bob Dylan", releaseTitle: "Highway 61 Revisited", label: "Columbia", catalogNumber: "CS 9189", format: "LP", price: "$200.00" },
  { artist: "The Rolling Stones", releaseTitle: "Exile on Main St.", label: "Rolling Stones Records", catalogNumber: "COC 69100", format: "LP", price: "$110.00" },
  { artist: "Joni Mitchell", releaseTitle: "Blue", label: "Reprise", catalogNumber: "MS 2038", format: "LP", price: "$125.00" },
  { artist: "Stevie Wonder", releaseTitle: "Songs in the Key of Life", label: "Tamla", catalogNumber: "T13-340C2", format: "LP", price: "$80.00" },
  { artist: "The Smiths", releaseTitle: "The Queen Is Dead", label: "Rough Trade", catalogNumber: "ROUGH 96", format: "LP", price: "$95.00" },
  { artist: "Pixies", releaseTitle: "Doolittle", label: "4AD", catalogNumber: "CAD 905", format: "LP", price: "$70.00" },
  { artist: "Sonic Youth", releaseTitle: "Daydream Nation", label: "Enigma", catalogNumber: "75403-1", format: "LP", price: "$85.00" },
  { artist: "The Cure", releaseTitle: "Disintegration", label: "Fiction", catalogNumber: "FIXH 14", format: "LP", price: "$100.00" },
  { artist: "New Order", releaseTitle: "Power, Corruption & Lies", label: "Factory", catalogNumber: "FACT 75", format: "LP", price: "$90.00" },
  { artist: "Depeche Mode", releaseTitle: "Violator", label: "Mute", catalogNumber: "STUMM 64", format: "LP", price: "$75.00" },
  { artist: "U2", releaseTitle: "The Joshua Tree", label: "Island", catalogNumber: "U2 6", format: "LP", price: "$60.00" },
  { artist: "R.E.M.", releaseTitle: "Automatic for the People", label: "Warner Bros.", catalogNumber: "9 45055-1", format: "LP", price: "$55.00" },
  { artist: "The Stone Roses", releaseTitle: "The Stone Roses", label: "Silvertone", catalogNumber: "ORE LP 502", format: "LP", price: "$130.00" },
  { artist: "My Bloody Valentine", releaseTitle: "Loveless", label: "Creation", catalogNumber: "CRELP 060", format: "LP", price: "$175.00" },
  { artist: "Massive Attack", releaseTitle: "Blue Lines", label: "Wild Bunch", catalogNumber: "WBRЛP 1", format: "LP", price: "$85.00" },
  { artist: "Portishead", releaseTitle: "Dummy", label: "Go! Beat", catalogNumber: "828 553-1", format: "LP", price: "$95.00" },
  { artist: "Bjork", releaseTitle: "Homogenic", label: "One Little Indian", catalogNumber: "TPLP 71", format: "LP", price: "$80.00" },
  { artist: "Aphex Twin", releaseTitle: "Selected Ambient Works 85-92", label: "Apollo", catalogNumber: "AMB LP 3922", format: "LP", price: "$120.00" },
  { artist: "Boards of Canada", releaseTitle: "Music Has the Right to Children", label: "Warp", catalogNumber: "WARP LP 55", format: "LP", price: "$110.00" },
  { artist: "Burial", releaseTitle: "Untrue", label: "Hyperdub", catalogNumber: "HDBLP 002", format: "LP", price: "$65.00" },
  { artist: "LCD Soundsystem", releaseTitle: "Sound of Silver", label: "DFA", catalogNumber: "DFA2161", format: "LP", price: "$55.00" },
  { artist: "Arcade Fire", releaseTitle: "Funeral", label: "Merge", catalogNumber: "MRG262", format: "LP", price: "$50.00" },
  { artist: "Vampire Weekend", releaseTitle: "Vampire Weekend", label: "XL", catalogNumber: "XLLP 319", format: "LP", price: "$35.00" },
  { artist: "Tame Impala", releaseTitle: "Currents", label: "Modular", catalogNumber: "MODVL 170", format: "LP", price: "$45.00" },
  { artist: "Frank Ocean", releaseTitle: "Blonde", label: "Boys Don't Cry", catalogNumber: "BDC-001", format: "LP", price: "$150.00" },
  { artist: "Kendrick Lamar", releaseTitle: "To Pimp a Butterfly", label: "Top Dawg", catalogNumber: "TDE 001", format: "LP", price: "$40.00" },
  { artist: "Tyler, The Creator", releaseTitle: "IGOR", label: "Columbia", catalogNumber: "19075943381", format: "LP", price: "$35.00" },
  { artist: "Kanye West", releaseTitle: "My Beautiful Dark Twisted Fantasy", label: "Roc-A-Fella", catalogNumber: "B0014695-01", format: "LP", price: "$65.00" },
  { artist: "OutKast", releaseTitle: "Stankonia", label: "LaFace", catalogNumber: "73008-26072-1", format: "LP", price: "$75.00" },
  { artist: "A Tribe Called Quest", releaseTitle: "The Low End Theory", label: "Jive", catalogNumber: "01241-41418-1", format: "LP", price: "$85.00" },
  { artist: "Wu-Tang Clan", releaseTitle: "Enter the Wu-Tang (36 Chambers)", label: "Loud", catalogNumber: "07863-66336-1", format: "LP", price: "$90.00" },
  { artist: "Nas", releaseTitle: "Illmatic", label: "Columbia", catalogNumber: "C 57684", format: "LP", price: "$95.00" },
  { artist: "The Notorious B.I.G.", releaseTitle: "Ready to Die", label: "Bad Boy", catalogNumber: "78612-73000-1", format: "LP", price: "$100.00" },
  { artist: "Dr. Dre", releaseTitle: "The Chronic", label: "Death Row", catalogNumber: "P1 57128", format: "LP", price: "$110.00" },
  { artist: "Marvin Gaye", releaseTitle: "What's Going On", label: "Tamla", catalogNumber: "TS 310", format: "LP", price: "$175.00" },
  { artist: "Al Green", releaseTitle: "Let's Stay Together", label: "Hi", catalogNumber: "XSHL 32070", format: "LP", price: "$80.00" },
  { artist: "Curtis Mayfield", releaseTitle: "Superfly", label: "Curtom", catalogNumber: "CRS 8014-ST", format: "LP", price: "$120.00" },
  { artist: "Aretha Franklin", releaseTitle: "I Never Loved a Man the Way I Love You", label: "Atlantic", catalogNumber: "SD 8139", format: "LP", price: "$140.00" },
  { artist: "Otis Redding", releaseTitle: "Otis Blue", label: "Volt", catalogNumber: "S-412", format: "LP", price: "$160.00" },
  { artist: "Sam Cooke", releaseTitle: "Live at the Harlem Square Club", label: "RCA", catalogNumber: "CPL1-5181", format: "LP", price: "$55.00" },
  { artist: "James Brown", releaseTitle: "Live at the Apollo", label: "King", catalogNumber: "826", format: "LP", price: "$200.00" },
  { artist: "Parliament", releaseTitle: "Mothership Connection", label: "Casablanca", catalogNumber: "NBLP 7022", format: "LP", price: "$85.00" },
  { artist: "Sly and the Family Stone", releaseTitle: "There's a Riot Goin' On", label: "Epic", catalogNumber: "KE 30986", format: "LP", price: "$95.00" },
  { artist: "Earth, Wind & Fire", releaseTitle: "That's the Way of the World", label: "Columbia", catalogNumber: "PC 33280", format: "LP", price: "$45.00" },
  { artist: "Herbie Hancock", releaseTitle: "Head Hunters", label: "Columbia", catalogNumber: "KC 32731", format: "LP", price: "$70.00" },
  { artist: "John Coltrane", releaseTitle: "A Love Supreme", label: "Impulse!", catalogNumber: "A-77", format: "LP", price: "$250.00" },
  { artist: "Charles Mingus", releaseTitle: "The Black Saint and the Sinner Lady", label: "Impulse!", catalogNumber: "A-35", format: "LP", price: "$180.00" },
  { artist: "Thelonious Monk", releaseTitle: "Brilliant Corners", label: "Riverside", catalogNumber: "RLP 12-226", format: "LP", price: "$220.00" },
  { artist: "Art Blakey", releaseTitle: "Moanin'", label: "Blue Note", catalogNumber: "BLP 4003", format: "LP", price: "$190.00" },
  { artist: "Cannonball Adderley", releaseTitle: "Somethin' Else", label: "Blue Note", catalogNumber: "BLP 1595", format: "LP", price: "$280.00" },
  { artist: "Bill Evans", releaseTitle: "Sunday at the Village Vanguard", label: "Riverside", catalogNumber: "RLP 9376", format: "LP", price: "$170.00" },
  { artist: "Duke Ellington", releaseTitle: "Ellington at Newport", label: "Columbia", catalogNumber: "CL 934", format: "LP", price: "$130.00" },
  { artist: "Count Basie", releaseTitle: "The Atomic Mr. Basie", label: "Roulette", catalogNumber: "R 52003", format: "LP", price: "$100.00" },
  { artist: "Weather Report", releaseTitle: "Heavy Weather", label: "Columbia", catalogNumber: "PC 34418", format: "LP", price: "$60.00" },
  { artist: "Return to Forever", releaseTitle: "Romantic Warrior", label: "Columbia", catalogNumber: "PC 34076", format: "LP", price: "$55.00" },
  { artist: "Mahavishnu Orchestra", releaseTitle: "The Inner Mounting Flame", label: "Columbia", catalogNumber: "KC 31067", format: "LP", price: "$65.00" },
  { artist: "Pat Metheny Group", releaseTitle: "Offramp", label: "ECM", catalogNumber: "ECM 1216", format: "LP", price: "$50.00" },
  { artist: "Wayne Shorter", releaseTitle: "Speak No Evil", label: "Blue Note", catalogNumber: "BLP 4194", format: "LP", price: "$240.00" },
  { artist: "Pharoah Sanders", releaseTitle: "Karma", label: "Impulse!", catalogNumber: "AS-9181", format: "LP", price: "$150.00" },
  { artist: "Alice Coltrane", releaseTitle: "Journey in Satchidananda", label: "Impulse!", catalogNumber: "AS-9203", format: "LP", price: "$180.00" },
  { artist: "Sun Ra", releaseTitle: "Space Is the Place", label: "Blue Thumb", catalogNumber: "BTS 41", format: "LP", price: "$200.00" },
  { artist: "Ornette Coleman", releaseTitle: "The Shape of Jazz to Come", label: "Atlantic", catalogNumber: "1317", format: "LP", price: "$220.00" },
  { artist: "Eric Dolphy", releaseTitle: "Out to Lunch!", label: "Blue Note", catalogNumber: "BLP 4163", format: "LP", price: "$260.00" },
  { artist: "Cecil Taylor", releaseTitle: "Unit Structures", label: "Blue Note", catalogNumber: "BLP 4237", format: "LP", price: "$170.00" },
  { artist: "Albert Ayler", releaseTitle: "Spiritual Unity", label: "ESP-Disk", catalogNumber: "ESP 1002", format: "LP", price: "$300.00" },
  { artist: "Don Cherry", releaseTitle: "Brown Rice", label: "A&M", catalogNumber: "SP-4418", format: "LP", price: "$120.00" },
  { artist: "Joe Henderson", releaseTitle: "Inner Urge", label: "Blue Note", catalogNumber: "BLP 4189", format: "LP", price: "$180.00" },
  { artist: "Freddie Hubbard", releaseTitle: "Red Clay", label: "CTI", catalogNumber: "CTI 6001", format: "LP", price: "$75.00" },
  { artist: "Lee Morgan", releaseTitle: "The Sidewinder", label: "Blue Note", catalogNumber: "BLP 4157", format: "LP", price: "$200.00" },
  { artist: "Horace Silver", releaseTitle: "Song for My Father", label: "Blue Note", catalogNumber: "BLP 4185", format: "LP", price: "$150.00" },
  { artist: "Kenny Burrell", releaseTitle: "Midnight Blue", label: "Blue Note", catalogNumber: "BLP 4123", format: "LP", price: "$170.00" },
  { artist: "Grant Green", releaseTitle: "Idle Moments", label: "Blue Note", catalogNumber: "BLP 4154", format: "LP", price: "$190.00" },
  { artist: "Wes Montgomery", releaseTitle: "The Incredible Jazz Guitar", label: "Riverside", catalogNumber: "RLP 12-320", format: "LP", price: "$160.00" },
  { artist: "Jimmy Smith", releaseTitle: "Back at the Chicken Shack", label: "Blue Note", catalogNumber: "BLP 4117", format: "LP", price: "$140.00" },
  { artist: "Hank Mobley", releaseTitle: "Soul Station", label: "Blue Note", catalogNumber: "BLP 4031", format: "LP", price: "$230.00" },
  { artist: "Sonny Rollins", releaseTitle: "Saxophone Colossus", label: "Prestige", catalogNumber: "PRLP 7079", format: "LP", price: "$280.00" },
  { artist: "Dexter Gordon", releaseTitle: "Go!", label: "Blue Note", catalogNumber: "BLP 4112", format: "LP", price: "$200.00" },
  { artist: "John McLaughlin", releaseTitle: "My Goal's Beyond", label: "Douglas", catalogNumber: "SD 9032", format: "LP", price: "$80.00" },
  { artist: "Larry Young", releaseTitle: "Unity", label: "Blue Note", catalogNumber: "BLP 4221", format: "LP", price: "$220.00" },
  { artist: "Andrew Hill", releaseTitle: "Point of Departure", label: "Blue Note", catalogNumber: "BLP 4167", format: "LP", price: "$240.00" },
  { artist: "McCoy Tyner", releaseTitle: "The Real McCoy", label: "Blue Note", catalogNumber: "BLP 4264", format: "LP", price: "$180.00" },
  { artist: "Chick Corea", releaseTitle: "Now He Sings, Now He Sobs", label: "Solid State", catalogNumber: "SS 18039", format: "LP", price: "$130.00" },
  { artist: "Keith Jarrett", releaseTitle: "The Koln Concert", label: "ECM", catalogNumber: "ECM 1064/65", format: "LP", price: "$100.00" },
  { artist: "Oscar Peterson", releaseTitle: "Night Train", label: "Verve", catalogNumber: "V-8538", format: "LP", price: "$90.00" },
  { artist: "Erroll Garner", releaseTitle: "Concert by the Sea", label: "Columbia", catalogNumber: "CL 883", format: "LP", price: "$70.00" },
];

export class MemStorage implements IStorage {
  private vinyls: Map<string, Vinyl>;
  private shops: Map<string, Shop>;
  private networkListings: Map<string, NetworkListing>;
  private messageThreads: Map<string, MessageThread>;
  private salesOrders: Map<string, SalesOrder>;
  private salesLineItems: Map<string, SalesLineItem>;
  private myShopId: string = "my-shop";
  private seeded: boolean = false;
  private orderCounter: number = 1000;

  constructor() {
    this.vinyls = new Map();
    this.shops = new Map();
    this.networkListings = new Map();
    this.messageThreads = new Map();
    this.salesOrders = new Map();
    this.salesLineItems = new Map();
  }

  private async ensureSeeded() {
    if (!this.seeded) {
      // Seed local vinyls
      for (const data of seedData) {
        await this.createVinyl(data);
      }
      
      // Seed shops
      const shopIds: string[] = [];
      for (const shopData of shopSeedData) {
        const id = randomUUID();
        this.shops.set(id, { id, ...shopData });
        shopIds.push(id);
      }
      
      // Seed network listings (100 records distributed across shops)
      for (let i = 0; i < 100; i++) {
        const template = networkListingTemplates[i % networkListingTemplates.length];
        const shopId = shopIds[i % shopIds.length];
        const id = randomUUID();
        const listing: NetworkListing = {
          id,
          shopId,
          artist: template.artist,
          releaseTitle: template.releaseTitle,
          label: template.label,
          catalogNumber: template.catalogNumber,
          format: template.format,
          price: template.price,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        };
        this.networkListings.set(id, listing);
      }
      
      // Seed sales data (60 orders across the last 90 days)
      this.seedSalesData();
      
      this.seeded = true;
    }
  }

  private seedSalesData() {
    const onlineMarketplaces = ["eBay", "Discogs", "Amazon"];
    const templates = networkListingTemplates;
    const buyerNames = ["John Smith", "Sarah Johnson", "Mike Brown", "Emily Davis", "Chris Wilson", "Alex Turner", "Jamie Lee", "Taylor Moore", "Jordan Casey", "Sam Morgan", "Pat Riley", "Dana White"];
    
    for (let i = 0; i < 60; i++) {
      const orderId = randomUUID();
      this.orderCounter++;
      const orderNumber = `ORD-${String(this.orderCounter).padStart(5, '0')}`;
      
      // Random date within the last 30 days for better dashboard visibility
      const daysAgo = Math.floor(Math.random() * 30);
      const hoursAgo = Math.floor(Math.random() * 24);
      const minutesAgo = Math.floor(Math.random() * 60);
      const secondsAgo = Math.floor(Math.random() * 60);
      const soldAt = new Date(Date.now() - ((daysAgo * 24 + hoursAgo) * 60 + minutesAgo) * 60 * 1000 - secondsAgo * 1000).toISOString();
      
      // Random channel with weighted distribution (55% inStore, 35% online, 10% network)
      const channelRoll = Math.random();
      const channel: SalesChannel = channelRoll < 0.55 ? "inStore" : channelRoll < 0.9 ? "online" : "network";
      
      const marketplace = channel === "online" ? onlineMarketplaces[Math.floor(Math.random() * onlineMarketplaces.length)] : undefined;
      const buyerName = channel !== "inStore" ? buyerNames[Math.floor(Math.random() * buyerNames.length)] : undefined;
      const buyerEmail = buyerName ? `${buyerName.toLowerCase().replace(/\s+/g, '.')}@email.com` : undefined;
      
      // 1 to 3 line items per order (weighted: 60% single, 30% double, 10% triple)
      const itemRoll = Math.random();
      const numLineItems = itemRoll < 0.6 ? 1 : itemRoll < 0.9 ? 2 : 3;
      let orderTotal = 0;
      const lineItems: SalesLineItem[] = [];
      
      for (let j = 0; j < numLineItems; j++) {
        const templateIndex = (i * 3 + j + Math.floor(Math.random() * 10)) % templates.length;
        const template = templates[templateIndex];
        const lineItemId = randomUUID();
        const quantity = Math.random() < 0.85 ? 1 : 2;
        const priceStr = template.price || "$35.00";
        const priceNum = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
        const unitPriceCents = Math.round((isNaN(priceNum) ? 35 : priceNum) * 100);
        const lineTotalCents = unitPriceCents * quantity;
        
        const lineItem: SalesLineItem = {
          id: lineItemId,
          orderId,
          artist: template.artist,
          releaseTitle: template.releaseTitle,
          quantity,
          unitPriceCents,
          lineTotalCents,
        };
        
        lineItems.push(lineItem);
        this.salesLineItems.set(lineItemId, lineItem);
        orderTotal += lineTotalCents;
      }
      
      const order: SalesOrder = {
        id: orderId,
        orderNumber,
        soldAt,
        channel,
        marketplace,
        buyerName,
        buyerEmail,
        totalCents: orderTotal,
        lineItems,
      };
      
      this.salesOrders.set(orderId, order);
    }
  }

  async getAllVinyls(): Promise<Vinyl[]> {
    await this.ensureSeeded();
    return Array.from(this.vinyls.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async getVinylById(id: string): Promise<Vinyl | undefined> {
    await this.ensureSeeded();
    return this.vinyls.get(id);
  }

  async createVinyl(insertVinyl: InsertVinyl): Promise<Vinyl> {
    const id = randomUUID();
    const now = new Date().toISOString();
    
    const vinyl: Vinyl = {
      id,
      createdAt: now,
      updatedAt: now,
      status: insertVinyl.status || "active",
      artist: insertVinyl.artist,
      releaseTitle: insertVinyl.releaseTitle,
      label: insertVinyl.label,
      catalogNumber: insertVinyl.catalogNumber,
      format: insertVinyl.format,
      countryOfRelease: insertVinyl.countryOfRelease,
      yearOfRelease: insertVinyl.yearOfRelease,
      editionNotes: insertVinyl.editionNotes,
      matrixRunoutSideA: insertVinyl.matrixRunoutSideA,
      matrixRunoutSideB: insertVinyl.matrixRunoutSideB,
      additionalRunoutMarkings: insertVinyl.additionalRunoutMarkings,
      masteringIdentifiersPresent: insertVinyl.masteringIdentifiersPresent,
      mediaGrade: insertVinyl.mediaGrade,
      sleeveGrade: insertVinyl.sleeveGrade,
      playTested: insertVinyl.playTested,
      playbackIssues: insertVinyl.playbackIssues,
      playbackNotes: insertVinyl.playbackNotes,
      warpPresent: insertVinyl.warpPresent,
      warpAffectsPlay: insertVinyl.warpAffectsPlay,
      pressingDefectsPresent: insertVinyl.pressingDefectsPresent,
      originalInnerSleeveIncluded: insertVinyl.originalInnerSleeveIncluded,
      originalInsertsIncluded: insertVinyl.originalInsertsIncluded,
      seamSplitsPresent: insertVinyl.seamSplitsPresent,
      writingOrStickersOnSleeveOrLabels: insertVinyl.writingOrStickersOnSleeveOrLabels,
      sealedCopy: insertVinyl.sealedCopy,
      shrinkOriginal: insertVinyl.shrinkOriginal,
      sellerNotes: insertVinyl.sellerNotes,
      price: insertVinyl.price,
      inStore: insertVinyl.inStore ?? false,
      online: insertVinyl.online ?? false,
      holdForCustomer: insertVinyl.holdForCustomer ?? false,
      network: insertVinyl.network ?? false,
      quantity: insertVinyl.quantity ?? 1,
      location: insertVinyl.location,
      marketplaces: insertVinyl.marketplaces ?? [],
      imagePath: insertVinyl.imagePath,
      onlineSettings: insertVinyl.onlineSettings,
    };

    this.vinyls.set(id, vinyl);
    return vinyl;
  }

  async updateVinyl(id: string, updates: Partial<InsertVinyl>): Promise<Vinyl | undefined> {
    await this.ensureSeeded();
    const existing = this.vinyls.get(id);
    if (!existing) return undefined;

    const updated: Vinyl = {
      ...existing,
      ...updates,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    };

    this.vinyls.set(id, updated);
    return updated;
  }

  async deleteVinyl(id: string): Promise<boolean> {
    await this.ensureSeeded();
    return this.vinyls.delete(id);
  }

  async markSold(id: string): Promise<Vinyl | undefined> {
    await this.ensureSeeded();
    const vinyl = this.vinyls.get(id);
    if (!vinyl) return undefined;

    if (vinyl.quantity <= 1) {
      const soldVinyl: Vinyl = { 
        ...vinyl, 
        quantity: 0, 
        status: "sold",
        updatedAt: new Date().toISOString(),
      };
      this.vinyls.set(id, soldVinyl);
      return soldVinyl;
    }

    const updated: Vinyl = {
      ...vinyl,
      quantity: vinyl.quantity - 1,
      updatedAt: new Date().toISOString(),
    };

    this.vinyls.set(id, updated);
    return updated;
  }

  async updateOnlineSettings(id: string, settings: OnlineSettings): Promise<Vinyl | undefined> {
    await this.ensureSeeded();
    const vinyl = this.vinyls.get(id);
    if (!vinyl) return undefined;

    const updated: Vinyl = {
      ...vinyl,
      onlineSettings: settings,
      updatedAt: new Date().toISOString(),
    };

    this.vinyls.set(id, updated);
    return updated;
  }

  // Network feature methods
  async getAllShops(): Promise<Shop[]> {
    await this.ensureSeeded();
    return Array.from(this.shops.values());
  }

  async getShopById(id: string): Promise<Shop | undefined> {
    await this.ensureSeeded();
    return this.shops.get(id);
  }

  async getAllNetworkListings(): Promise<NetworkListingWithShop[]> {
    await this.ensureSeeded();
    const listings = Array.from(this.networkListings.values());
    return listings
      .map(listing => {
        const shop = this.shops.get(listing.shopId);
        if (!shop) return null;
        return { ...listing, shop };
      })
      .filter((l): l is NetworkListingWithShop => l !== null)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getNetworkListingById(id: string): Promise<NetworkListingWithShop | undefined> {
    await this.ensureSeeded();
    const listing = this.networkListings.get(id);
    if (!listing) return undefined;
    
    const shop = this.shops.get(listing.shopId);
    if (!shop) return undefined;
    
    return { ...listing, shop };
  }

  async getMyNetworkListings(): Promise<NetworkListing[]> {
    await this.ensureSeeded();
    return Array.from(this.networkListings.values())
      .filter(listing => listing.vinylId !== undefined)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async createNetworkListing(vinylId: string): Promise<NetworkListing> {
    await this.ensureSeeded();
    const vinyl = this.vinyls.get(vinylId);
    if (!vinyl) {
      throw new Error("Vinyl not found");
    }

    const id = randomUUID();
    const listing: NetworkListing = {
      id,
      shopId: this.myShopId,
      artist: vinyl.artist,
      releaseTitle: vinyl.releaseTitle,
      label: vinyl.label,
      catalogNumber: vinyl.catalogNumber,
      format: vinyl.format,
      price: vinyl.price,
      createdAt: new Date().toISOString(),
      vinylId,
    };

    this.networkListings.set(id, listing);
    return listing;
  }

  async removeNetworkListing(id: string): Promise<boolean> {
    await this.ensureSeeded();
    return this.networkListings.delete(id);
  }

  // Messaging methods
  async getOrCreateMessageThread(shopId: string, networkListingId: string): Promise<MessageThread> {
    await this.ensureSeeded();
    
    // Find existing thread
    const existingThread = Array.from(this.messageThreads.values()).find(
      t => t.shopId === shopId && t.networkListingId === networkListingId
    );
    
    if (existingThread) {
      return existingThread;
    }

    // Create new thread with some seed messages
    const threadId = randomUUID();
    const listing = this.networkListings.get(networkListingId);
    const shop = this.shops.get(shopId);
    
    const seedMessages: Message[] = [
      {
        id: randomUUID(),
        threadId,
        shopId,
        networkListingId,
        content: `Hi! I'm interested in your ${listing?.releaseTitle || "vinyl"}. Is it still available?`,
        isFromMe: true,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: randomUUID(),
        threadId,
        shopId,
        networkListingId,
        content: `Hello! Yes, it's still available. Would you like more details or photos?`,
        isFromMe: false,
        createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
      },
    ];

    const thread: MessageThread = {
      id: threadId,
      shopId,
      networkListingId,
      messages: seedMessages,
    };

    this.messageThreads.set(threadId, thread);
    return thread;
  }

  async sendMessage(data: InsertMessage): Promise<Message> {
    await this.ensureSeeded();
    
    let thread: MessageThread;
    
    if (data.threadId) {
      const existing = this.messageThreads.get(data.threadId);
      if (!existing) {
        throw new Error("Thread not found");
      }
      thread = existing;
    } else {
      thread = await this.getOrCreateMessageThread(data.shopId, data.networkListingId);
    }

    const message: Message = {
      id: randomUUID(),
      threadId: thread.id,
      shopId: data.shopId,
      networkListingId: data.networkListingId,
      content: data.content,
      isFromMe: true,
      createdAt: new Date().toISOString(),
    };

    thread.messages.push(message);
    this.messageThreads.set(thread.id, thread);
    
    return message;
  }

  // Sales methods
  async getAllSalesOrders(options?: { startDate?: string; endDate?: string; search?: string }): Promise<SalesOrder[]> {
    await this.ensureSeeded();
    let orders = Array.from(this.salesOrders.values());
    
    if (options?.startDate) {
      const start = new Date(options.startDate).getTime();
      orders = orders.filter(o => new Date(o.soldAt).getTime() >= start);
    }
    if (options?.endDate) {
      const end = new Date(options.endDate).getTime();
      orders = orders.filter(o => new Date(o.soldAt).getTime() <= end);
    }
    if (options?.search) {
      const search = options.search.toLowerCase();
      orders = orders.filter(o => 
        o.orderNumber.toLowerCase().includes(search) ||
        o.buyerName?.toLowerCase().includes(search) ||
        o.lineItems?.some(li => 
          li.artist.toLowerCase().includes(search) ||
          li.releaseTitle.toLowerCase().includes(search)
        )
      );
    }
    
    return orders.sort((a, b) => new Date(b.soldAt).getTime() - new Date(a.soldAt).getTime());
  }

  async getSalesOrderById(id: string): Promise<SalesOrder | undefined> {
    await this.ensureSeeded();
    return this.salesOrders.get(id);
  }

  async getAllSalesLineItems(options?: { startDate?: string; endDate?: string; search?: string }): Promise<(SalesLineItem & { order: SalesOrder })[]> {
    await this.ensureSeeded();
    const orders = await this.getAllSalesOrders(options);
    const orderMap = new Map(orders.map(o => [o.id, o]));
    
    let items: (SalesLineItem & { order: SalesOrder })[] = [];
    
    for (const order of orders) {
      if (order.lineItems) {
        for (const item of order.lineItems) {
          items.push({ ...item, order });
        }
      }
    }
    
    if (options?.search) {
      const search = options.search.toLowerCase();
      items = items.filter(item =>
        item.artist.toLowerCase().includes(search) ||
        item.releaseTitle.toLowerCase().includes(search) ||
        item.order.orderNumber.toLowerCase().includes(search)
      );
    }
    
    return items.sort((a, b) => new Date(b.order.soldAt).getTime() - new Date(a.order.soldAt).getTime());
  }

  async getSalesStats(range: '7' | '30' | '90' | 'all'): Promise<SalesStats> {
    await this.ensureSeeded();
    
    const now = new Date();
    const days = range === 'all' ? 365 : parseInt(range);
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    
    const orders = Array.from(this.salesOrders.values()).filter(o => 
      range === 'all' || new Date(o.soldAt).getTime() >= startDate.getTime()
    );
    
    // Calculate KPIs
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalCents, 0);
    const unitsSold = orders.reduce((sum, o) => 
      sum + (o.lineItems?.reduce((s, li) => s + li.quantity, 0) || 0), 0
    );
    const ordersCount = orders.length;
    const avgOrderValue = ordersCount > 0 ? Math.round(totalRevenue / ordersCount) : 0;
    
    // Revenue by day
    const revenueByDayMap = new Map<string, number>();
    for (const order of orders) {
      const date = new Date(order.soldAt).toISOString().split('T')[0];
      revenueByDayMap.set(date, (revenueByDayMap.get(date) || 0) + order.totalCents);
    }
    const revenueByDay = Array.from(revenueByDayMap.entries())
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => a.date.localeCompare(b.date));
    
    // Top artists by revenue
    const artistRevenueMap = new Map<string, number>();
    for (const order of orders) {
      for (const item of order.lineItems || []) {
        artistRevenueMap.set(item.artist, (artistRevenueMap.get(item.artist) || 0) + item.lineTotalCents);
      }
    }
    const topArtists = Array.from(artistRevenueMap.entries())
      .map(([artist, revenue]) => ({ artist, revenue }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);
    
    // Sales by channel
    const channelMap = new Map<SalesChannel, { count: number; revenue: number }>();
    for (const order of orders) {
      const existing = channelMap.get(order.channel) || { count: 0, revenue: 0 };
      channelMap.set(order.channel, {
        count: existing.count + 1,
        revenue: existing.revenue + order.totalCents
      });
    }
    const salesByChannel = Array.from(channelMap.entries())
      .map(([channel, data]) => ({ channel, ...data }));
    
    return {
      totalRevenue,
      unitsSold,
      ordersCount,
      avgOrderValue,
      revenueByDay,
      topArtists,
      salesByChannel,
    };
  }

  async createSalesOrder(data: InsertSalesOrder): Promise<SalesOrder> {
    await this.ensureSeeded();
    
    const orderId = randomUUID();
    this.orderCounter++;
    const orderNumber = `ORD-${this.orderCounter}`;
    
    let orderTotal = 0;
    const lineItems: SalesLineItem[] = [];
    
    for (const itemData of data.lineItems) {
      const lineItemId = randomUUID();
      const lineTotalCents = itemData.unitPriceCents * itemData.quantity;
      
      const lineItem: SalesLineItem = {
        id: lineItemId,
        orderId,
        vinylId: itemData.vinylId,
        artist: itemData.artist,
        releaseTitle: itemData.releaseTitle,
        quantity: itemData.quantity,
        unitPriceCents: itemData.unitPriceCents,
        lineTotalCents,
      };
      
      lineItems.push(lineItem);
      this.salesLineItems.set(lineItemId, lineItem);
      orderTotal += lineTotalCents;
    }
    
    const order: SalesOrder = {
      id: orderId,
      orderNumber,
      soldAt: new Date().toISOString(),
      channel: data.channel,
      marketplace: data.marketplace,
      buyerName: data.buyerName,
      buyerEmail: data.buyerEmail,
      totalCents: orderTotal,
      lineItems,
    };
    
    this.salesOrders.set(orderId, order);
    return order;
  }
}

export const storage = new MemStorage();
