// auctionTypes.ts
export interface Auction {
    id: string;
    loanId: string;
    highestBid: number;
    bidder: string;
    status: "open" | "closed";
  }
  
  export {}; // Fix for --isolatedModules
  