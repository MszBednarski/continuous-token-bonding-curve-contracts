// https://github.com/AragonBlack/fundraising/blob/master/apps/bancor-formula/contracts/BancorFormula.sol
import { BN } from "@zilliqa-js/util";

const maxExpArray: { [key: number]: BN } = {};
//  maxExpArray[  0] = 0x6bffffffffffffffffffffffffffffffff;
//  maxExpArray[  1] = 0x67ffffffffffffffffffffffffffffffff;
//  maxExpArray[  2] = 0x637fffffffffffffffffffffffffffffff;
//  maxExpArray[  3] = 0x5f6fffffffffffffffffffffffffffffff;
//  maxExpArray[  4] = 0x5b77ffffffffffffffffffffffffffffff;
//  maxExpArray[  5] = 0x57b3ffffffffffffffffffffffffffffff;
//  maxExpArray[  6] = 0x5419ffffffffffffffffffffffffffffff;
//  maxExpArray[  7] = 0x50a2ffffffffffffffffffffffffffffff;
//  maxExpArray[  8] = 0x4d517fffffffffffffffffffffffffffff;
//  maxExpArray[  9] = 0x4a233fffffffffffffffffffffffffffff;
//  maxExpArray[ 10] = 0x47165fffffffffffffffffffffffffffff;
//  maxExpArray[ 11] = 0x4429afffffffffffffffffffffffffffff;
//  maxExpArray[ 12] = 0x415bc7ffffffffffffffffffffffffffff;
//  maxExpArray[ 13] = 0x3eab73ffffffffffffffffffffffffffff;
//  maxExpArray[ 14] = 0x3c1771ffffffffffffffffffffffffffff;
//  maxExpArray[ 15] = 0x399e96ffffffffffffffffffffffffffff;
//  maxExpArray[ 16] = 0x373fc47fffffffffffffffffffffffffff;
//  maxExpArray[ 17] = 0x34f9e8ffffffffffffffffffffffffffff;
//  maxExpArray[ 18] = 0x32cbfd5fffffffffffffffffffffffffff;
//  maxExpArray[ 19] = 0x30b5057fffffffffffffffffffffffffff;
//  maxExpArray[ 20] = 0x2eb40f9fffffffffffffffffffffffffff;
//  maxExpArray[ 21] = 0x2cc8340fffffffffffffffffffffffffff;
//  maxExpArray[ 22] = 0x2af09481ffffffffffffffffffffffffff;
//  maxExpArray[ 23] = 0x292c5bddffffffffffffffffffffffffff;
//  maxExpArray[ 24] = 0x277abdcdffffffffffffffffffffffffff;
//  maxExpArray[ 25] = 0x25daf6657fffffffffffffffffffffffff;
//  maxExpArray[ 26] = 0x244c49c65fffffffffffffffffffffffff;
//  maxExpArray[ 27] = 0x22ce03cd5fffffffffffffffffffffffff;
//  maxExpArray[ 28] = 0x215f77c047ffffffffffffffffffffffff;
//  maxExpArray[ 29] = 0x1fffffffffffffffffffffffffffffffff;
//  maxExpArray[ 30] = 0x1eaefdbdabffffffffffffffffffffffff;
//  maxExpArray[ 31] = 0x1d6bd8b2ebffffffffffffffffffffffff;
maxExpArray[32] = new BN("0x1c35fedd14ffffffffffffffffffffffff", "hex");
maxExpArray[33] = new BN("0x1b0ce43b323fffffffffffffffffffffff", "hex");
maxExpArray[34] = new BN("0x19f0028ec1ffffffffffffffffffffffff", "hex");
maxExpArray[35] = new BN("0x18ded91f0e7fffffffffffffffffffffff", "hex");
maxExpArray[36] = new BN("0x17d8ec7f0417ffffffffffffffffffffff", "hex");
maxExpArray[37] = new BN("0x16ddc6556cdbffffffffffffffffffffff", "hex");
maxExpArray[38] = new BN("0x15ecf52776a1ffffffffffffffffffffff", "hex");
maxExpArray[39] = new BN("0x15060c256cb2ffffffffffffffffffffff", "hex");
maxExpArray[40] = new BN("0x1428a2f98d72ffffffffffffffffffffff", "hex");
maxExpArray[41] = new BN("0x13545598e5c23fffffffffffffffffffff", "hex");
maxExpArray[42] = new BN("0x1288c4161ce1dfffffffffffffffffffff", "hex");
maxExpArray[43] = new BN("0x11c592761c666fffffffffffffffffffff", "hex");
maxExpArray[44] = new BN("0x110a688680a757ffffffffffffffffffff", "hex");
maxExpArray[45] = new BN("0x1056f1b5bedf77ffffffffffffffffffff", "hex");
maxExpArray[46] = new BN("0x0faadceceeff8bffffffffffffffffffff", "hex");
maxExpArray[47] = new BN("0x0f05dc6b27edadffffffffffffffffffff", "hex");
maxExpArray[48] = new BN("0x0e67a5a25da4107fffffffffffffffffff", "hex");
maxExpArray[49] = new BN("0x0dcff115b14eedffffffffffffffffffff", "hex");
maxExpArray[50] = new BN("0x0d3e7a392431239fffffffffffffffffff", "hex");
maxExpArray[51] = new BN("0x0cb2ff529eb71e4fffffffffffffffffff", "hex");
maxExpArray[52] = new BN("0x0c2d415c3db974afffffffffffffffffff", "hex");
maxExpArray[53] = new BN("0x0bad03e7d883f69bffffffffffffffffff", "hex");
maxExpArray[54] = new BN("0x0b320d03b2c343d5ffffffffffffffffff", "hex");
maxExpArray[55] = new BN("0x0abc25204e02828dffffffffffffffffff", "hex");
maxExpArray[56] = new BN("0x0a4b16f74ee4bb207fffffffffffffffff", "hex");
maxExpArray[57] = new BN("0x09deaf736ac1f569ffffffffffffffffff", "hex");
maxExpArray[58] = new BN("0x0976bd9952c7aa957fffffffffffffffff", "hex");
maxExpArray[59] = new BN("0x09131271922eaa606fffffffffffffffff", "hex");
maxExpArray[60] = new BN("0x08b380f3558668c46fffffffffffffffff", "hex");
maxExpArray[61] = new BN("0x0857ddf0117efa215bffffffffffffffff", "hex");
maxExpArray[62] = new BN("0x07ffffffffffffffffffffffffffffffff", "hex");
maxExpArray[63] = new BN("0x07abbf6f6abb9d087fffffffffffffffff", "hex");
maxExpArray[64] = new BN("0x075af62cbac95f7dfa7fffffffffffffff", "hex");
maxExpArray[65] = new BN("0x070d7fb7452e187ac13fffffffffffffff", "hex");
maxExpArray[66] = new BN("0x06c3390ecc8af379295fffffffffffffff", "hex");
maxExpArray[67] = new BN("0x067c00a3b07ffc01fd6fffffffffffffff", "hex");
maxExpArray[68] = new BN("0x0637b647c39cbb9d3d27ffffffffffffff", "hex");
maxExpArray[69] = new BN("0x05f63b1fc104dbd39587ffffffffffffff", "hex");
maxExpArray[70] = new BN("0x05b771955b36e12f7235ffffffffffffff", "hex");
maxExpArray[71] = new BN("0x057b3d49dda84556d6f6ffffffffffffff", "hex");
maxExpArray[72] = new BN("0x054183095b2c8ececf30ffffffffffffff", "hex");
maxExpArray[73] = new BN("0x050a28be635ca2b888f77fffffffffffff", "hex");
maxExpArray[74] = new BN("0x04d5156639708c9db33c3fffffffffffff", "hex");
maxExpArray[75] = new BN("0x04a23105873875bd52dfdfffffffffffff", "hex");
maxExpArray[76] = new BN("0x0471649d87199aa990756fffffffffffff", "hex");
maxExpArray[77] = new BN("0x04429a21a029d4c1457cfbffffffffffff", "hex");
maxExpArray[78] = new BN("0x0415bc6d6fb7dd71af2cb3ffffffffffff", "hex");
maxExpArray[79] = new BN("0x03eab73b3bbfe282243ce1ffffffffffff", "hex");
maxExpArray[80] = new BN("0x03c1771ac9fb6b4c18e229ffffffffffff", "hex");
maxExpArray[81] = new BN("0x0399e96897690418f785257fffffffffff", "hex");
maxExpArray[82] = new BN("0x0373fc456c53bb779bf0ea9fffffffffff", "hex");
maxExpArray[83] = new BN("0x034f9e8e490c48e67e6ab8bfffffffffff", "hex");
maxExpArray[84] = new BN("0x032cbfd4a7adc790560b3337ffffffffff", "hex");
maxExpArray[85] = new BN("0x030b50570f6e5d2acca94613ffffffffff", "hex");
maxExpArray[86] = new BN("0x02eb40f9f620fda6b56c2861ffffffffff", "hex");
maxExpArray[87] = new BN("0x02cc8340ecb0d0f520a6af58ffffffffff", "hex");
maxExpArray[88] = new BN("0x02af09481380a0a35cf1ba02ffffffffff", "hex");
maxExpArray[89] = new BN("0x0292c5bdd3b92ec810287b1b3fffffffff", "hex");
maxExpArray[90] = new BN("0x0277abdcdab07d5a77ac6d6b9fffffffff", "hex");
maxExpArray[91] = new BN("0x025daf6654b1eaa55fd64df5efffffffff", "hex");
maxExpArray[92] = new BN("0x0244c49c648baa98192dce88b7ffffffff", "hex");
maxExpArray[93] = new BN("0x022ce03cd5619a311b2471268bffffffff", "hex");
maxExpArray[94] = new BN("0x0215f77c045fbe885654a44a0fffffffff", "hex");
maxExpArray[95] = new BN("0x01ffffffffffffffffffffffffffffffff", "hex");
maxExpArray[96] = new BN("0x01eaefdbdaaee7421fc4d3ede5ffffffff", "hex");
maxExpArray[97] = new BN("0x01d6bd8b2eb257df7e8ca57b09bfffffff", "hex");
maxExpArray[98] = new BN("0x01c35fedd14b861eb0443f7f133fffffff", "hex");
maxExpArray[99] = new BN("0x01b0ce43b322bcde4a56e8ada5afffffff", "hex");
maxExpArray[100] = new BN("0x019f0028ec1fff007f5a195a39dfffffff", "hex");
maxExpArray[101] = new BN("0x018ded91f0e72ee74f49b15ba527ffffff", "hex");
maxExpArray[102] = new BN("0x017d8ec7f04136f4e5615fd41a63ffffff", "hex");
maxExpArray[103] = new BN("0x016ddc6556cdb84bdc8d12d22e6fffffff", "hex");
maxExpArray[104] = new BN("0x015ecf52776a1155b5bd8395814f7fffff", "hex");
maxExpArray[105] = new BN("0x015060c256cb23b3b3cc3754cf40ffffff", "hex");
maxExpArray[106] = new BN("0x01428a2f98d728ae223ddab715be3fffff", "hex");
maxExpArray[107] = new BN("0x013545598e5c23276ccf0ede68034fffff", "hex");
maxExpArray[108] = new BN("0x01288c4161ce1d6f54b7f61081194fffff", "hex");
maxExpArray[109] = new BN("0x011c592761c666aa641d5a01a40f17ffff", "hex");
maxExpArray[110] = new BN("0x0110a688680a7530515f3e6e6cfdcdffff", "hex");
maxExpArray[111] = new BN("0x01056f1b5bedf75c6bcb2ce8aed428ffff", "hex");
maxExpArray[112] = new BN("0x00faadceceeff8a0890f3875f008277fff", "hex");
maxExpArray[113] = new BN("0x00f05dc6b27edad306388a600f6ba0bfff", "hex");
maxExpArray[114] = new BN("0x00e67a5a25da41063de1495d5b18cdbfff", "hex");
maxExpArray[115] = new BN("0x00dcff115b14eedde6fc3aa5353f2e4fff", "hex");
maxExpArray[116] = new BN("0x00d3e7a3924312399f9aae2e0f868f8fff", "hex");
maxExpArray[117] = new BN("0x00cb2ff529eb71e41582cccd5a1ee26fff", "hex");
maxExpArray[118] = new BN("0x00c2d415c3db974ab32a51840c0b67edff", "hex");
maxExpArray[119] = new BN("0x00bad03e7d883f69ad5b0a186184e06bff", "hex");
maxExpArray[120] = new BN("0x00b320d03b2c343d4829abd6075f0cc5ff", "hex");
maxExpArray[121] = new BN("0x00abc25204e02828d73c6e80bcdb1a95bf", "hex");
maxExpArray[122] = new BN("0x00a4b16f74ee4bb2040a1ec6c15fbbf2df", "hex");
maxExpArray[123] = new BN("0x009deaf736ac1f569deb1b5ae3f36c130f", "hex");
maxExpArray[124] = new BN("0x00976bd9952c7aa957f5937d790ef65037", "hex");
maxExpArray[125] = new BN("0x009131271922eaa6064b73a22d0bd4f2bf", "hex");
maxExpArray[126] = new BN("0x008b380f3558668c46c91c49a2f8e967b9", "hex");
maxExpArray[127] = new BN("0x00857ddf0117efa215952912839f6473e6", "hex");

export { maxExpArray };