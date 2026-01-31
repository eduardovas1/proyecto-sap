export type InfotypeCode =
  | '0001' | '0002' | '0003' | '0004' | '0005' | '0006' | '0007' | '0008'
  | '0009' | '0010' | '0011' | '0012' | '0013' | '0014' | '0015' | '0016'
  | '0017' | '0018' | '0019' | '0020' | '0021' | '0022' | '0023' | '0024'
  | '0025' | '0026' | '0027' | '0028' | '0029' | '0030' | '0031' | '0032' | '0033';


  export type InfotypeConfig = { table: string; hasMirror?: boolean };

export const INFOTYPES: Partial<Record<InfotypeCode, InfotypeConfig>> = {
    '0001': { table: 'TXCAP0001', hasMirror: true },
    '0002': { table: 'TXCAP0002', hasMirror: true },
    '0003': { table: 'TXCAP0003', hasMirror: true },
    '0004': { table: 'TXCAP0004', hasMirror: true },
    '0005': { table: 'TXCAP0005', hasMirror: true },
    '0006': { table: 'TXCAP0006', hasMirror: true },
    '0007': { table: 'TXCAP0007', hasMirror: true },
    '0008': { table: 'TXCAP0008', hasMirror: true },
    '0009': { table: 'TXCAP0009', hasMirror: true },
    '0010': { table: 'TXCAP0010', hasMirror: true },
    '0011': { table: 'TXCAP0011', hasMirror: true },
    '0012': { table: 'TXCAP0012', hasMirror: true },
    '0013': { table: 'TXCAP0013', hasMirror: true },
    '0014': { table: 'TXCAP0014', hasMirror: true },
    '0015': { table: 'TXCAP0015', hasMirror: true },
    '0016': { table: 'TXCAP0016', hasMirror: true },
    '0017': { table: 'TXCAP0017', hasMirror: true },
    '0018': { table: 'TXCAP0018', hasMirror: true },
    '0019': { table: 'TXCAP0019', hasMirror: true },
    '0020': { table: 'TXCAP0020', hasMirror: true },
    '0021': { table: 'TXCAP0021', hasMirror: true },
    '0022': { table: 'TXCAP0022', hasMirror: true },
    '0023': { table: 'TXCAP0023', hasMirror: true },
    '0024': { table: 'TXCAP0024', hasMirror: true },
    '0025': { table: 'TXCAP0025', hasMirror: true },
    '0026': { table: 'TXCAP0026', hasMirror: true },
    '0027': { table: 'TXCAP0027', hasMirror: true },
    '0028': { table: 'TXCAP0028', hasMirror: true },
    '0029': { table: 'TXCAP0029', hasMirror: true },
    '0030': { table: 'TXCAP0030', hasMirror: true },
    '0031': { table: 'TXCAP0031', hasMirror: true },
    '0032': { table: 'TXCAP0032', hasMirror: true },
    '0033': { table: 'TXCAP0033', hasMirror: true },
};
