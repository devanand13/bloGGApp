
export function convertDateString(dateString : string){
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const month = date.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' });
    const year = date.getUTCFullYear();

    function getOrdinal(n:number) {
        if (n > 3 && n < 21) return n + 'th';
        switch (n % 10) {
          case 1: return n + 'st';
          case 2: return n + 'nd';
          case 3: return n + 'rd';
          default: return n + 'th';
        }
      }    

    const formattedDate = `${getOrdinal(day)} ${month} ${year}`;
    return formattedDate;
}