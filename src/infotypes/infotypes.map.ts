export type InfotypeConfig = {
  code: string;
  model: string;        // Prisma model name
  historyModel?: string; // Prisma model name for audit/history (optional)
  hasValidity: boolean; // uses XCFECINI/XCFECFIN
  dateField?: string;   // for range queries (default XCFECINI)
};

export const INFOTYPES_MAP: Record<string, InfotypeConfig> = {
  '0001': { code: '0001', model: 'TXCAP0001', historyModel: 'TXCAP0001_M', hasValidity: true },
  '0002': { code: '0002', model: 'TXCAP0002', historyModel: 'TXCAP0002_M', hasValidity: true },
  '0003': { code: '0003', model: 'TXCAP0003', historyModel: 'TXCAP0003_M', hasValidity: true },
  '0004': { code: '0004', model: 'TXCAP0004', historyModel: 'TXCAP0004_M', hasValidity: true },
  '0005': { code: '0005', model: 'TXCAP0005', historyModel: 'TXCAP0005_M', hasValidity: true },
  '0006': { code: '0006', model: 'TXCAP0006', historyModel: 'TXCAP0006_M', hasValidity: true },
  '0007': { code: '0007', model: 'TXCAP0007', historyModel: 'TXCAP0007_M', hasValidity: true },
  '0008': { code: '0008', model: 'TXCAP0008', historyModel: 'TXCAP0008_M', hasValidity: true },
  '0009': { code: '0009', model: 'TXCAP0009', historyModel: 'TXCAP0009_M', hasValidity: true },
  '0010': { code: '0010', model: 'TXCAP0010', historyModel: 'TXCAP0010_M', hasValidity: true },
  '0011': { code: '0011', model: 'TXCAP0011', historyModel: 'TXCAP0011_M', hasValidity: true },
  '0012': { code: '0012', model: 'TXCAP0012', historyModel: 'TXCAP0012_M', hasValidity: true },
  '0013': { code: '0013', model: 'TXCAP0013', historyModel: 'TXCAP0013_M', hasValidity: true },
  '0014': { code: '0014', model: 'TXCAP0014', historyModel: 'TXCAP0014_M', hasValidity: true },
  '0015': { code: '0015', model: 'TXCAP0015', historyModel: 'TXCAP0015_M', hasValidity: true },
  '0016': { code: '0016', model: 'TXCAP0016', historyModel: 'TXCAP0016_M', hasValidity: true },
  '0017': { code: '0017', model: 'TXCAP0017', historyModel: 'TXCAP0017_M', hasValidity: true },
  '0018': { code: '0018', model: 'TXCAP0018', historyModel: 'TXCAP0018_M', hasValidity: true },
  '0019': { code: '0019', model: 'TXCAP0019', historyModel: 'TXCAP0019_M', hasValidity: true },
  '0020': { code: '0020', model: 'TXCAP0020', historyModel: 'TXCAP0020_M', hasValidity: true },
  '0021': { code: '0021', model: 'TXCAP0021', historyModel: 'TXCAP0021_M', hasValidity: true },
  '0022': { code: '0022', model: 'TXCAP0022', historyModel: 'TXCAP0022_M', hasValidity: true },
  '0023': { code: '0023', model: 'TXCAP0023', historyModel: 'TXCAP0023_M', hasValidity: true },
  '0024': { code: '0024', model: 'TXCAP0024', historyModel: 'TXCAP0024_M', hasValidity: true },
  '0025': { code: '0025', model: 'TXCAP0025', historyModel: 'TXCAP0025_M', hasValidity: true },
  '0026': { code: '0026', model: 'TXCAP0026', historyModel: 'TXCAP0026_M', hasValidity: true },
  '0027': { code: '0027', model: 'TXCAP0027', historyModel: 'TXCAP0027_M', hasValidity: true, dateField: 'XCFECINI' },
  '0028': { code: '0028', model: 'TXCAP0028', historyModel: 'TXCAP0028_M', hasValidity: true, dateField: 'XCFECINI' },
  '0029': { code: '0029', model: 'TXCAP0029', historyModel: 'TXCAP0029_M', hasValidity: true, dateField: 'XCFECINI' },
  '0030': { code: '0030', model: 'TXCAP0030', historyModel: 'TXCAP0030_M', hasValidity: true, dateField: 'XCFECINI' },
  '0031': { code: '0031', model: 'TXCAP0031', historyModel: 'TXCAP0031_M', hasValidity: true, dateField: 'XCFECINI' },
  '0032': { code: '0032', model: 'TXCAP0032', historyModel: 'TXCAP0032_M', hasValidity: true, dateField: 'XCFECINI' },
  '0033': { code: '0033', model: 'TXCAP0033', historyModel: 'TXCAP0033_M', hasValidity: true, dateField: 'XCFECINI' },
};
