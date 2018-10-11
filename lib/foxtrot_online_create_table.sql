-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.23-log - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             9.5.0.5282
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table lafferty_jjixgbv9my802728.acctbal
CREATE TABLE IF NOT EXISTS `acctbal` (
  `acctBalID` int(11) NOT NULL AUTO_INCREMENT,
  `cli_no` varchar(11) DEFAULT NULL,
  `cli_name` varchar(50) DEFAULT NULL,
  `rep_no` int(11) DEFAULT NULL,
  `source` varchar(3) DEFAULT NULL,
  `dst_amt` decimal(17,2) DEFAULT NULL,
  `net_amt` decimal(12,2) DEFAULT NULL,
  `bet_amt` decimal(12,2) DEFAULT NULL,
  `branch_no` varchar(5) DEFAULT NULL,
  `rep_name` varchar(30) DEFAULT NULL,
  `soc_sec` varchar(11) DEFAULT NULL,
  `customerID` int(11) NOT NULL,
  `lastModifiedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`acctBalID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table lafferty_jjixgbv9my802728.acctpos
CREATE TABLE IF NOT EXISTS `acctpos` (
  `acctPosID` int(11) NOT NULL AUTO_INCREMENT,
  `source` varchar(3) DEFAULT NULL,
  `rep_no` int(11) DEFAULT NULL,
  `invest` varchar(35) DEFAULT NULL,
  `co_no` smallint(6) DEFAULT NULL,
  `cusip_no` varchar(9) DEFAULT NULL,
  `company` varchar(35) DEFAULT NULL,
  `inv_type` tinyint(4) DEFAULT NULL,
  `inv_no` int(11) DEFAULT NULL,
  `date_placed` datetime DEFAULT NULL,
  `date_rec` datetime DEFAULT NULL,
  `activ_date` datetime DEFAULT NULL,
  `buy_sell` char(1) DEFAULT NULL,
  `units` decimal(17,4) DEFAULT NULL,
  `price` decimal(14,6) DEFAULT NULL,
  `net_amt` decimal(17,2) DEFAULT NULL,
  `d_amt` decimal(17,2) DEFAULT NULL,
  `f_amt` decimal(17,2) DEFAULT NULL,
  `cli_no` varchar(11) DEFAULT NULL,
  `soc_sec` varchar(11) DEFAULT NULL,
  `addr` varchar(30) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `zip` varchar(10) DEFAULT NULL,
  `cli_name` varchar(40) DEFAULT NULL,
  `fname` varchar(20) DEFAULT NULL,
  `lname` varchar(20) DEFAULT NULL,
  `middle` char(1) DEFAULT NULL,
  `branch_no` varchar(5) DEFAULT NULL,
  `customerID` int(11) NOT NULL,
  `lastModifiedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`acctPosID`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table lafferty_jjixgbv9my802728.branches
CREATE TABLE IF NOT EXISTS `branches` (
  `branchID` int(11) NOT NULL AUTO_INCREMENT,
  `branch_no` varchar(5) DEFAULT NULL,
  `branch_name` varchar(50) DEFAULT NULL,
  `rep_no` int(11) DEFAULT NULL,
  `customerID` int(11) NOT NULL,
  `lastModifiedDate` datetime NOT NULL,
  PRIMARY KEY (`branchID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table lafferty_jjixgbv9my802728.clearing
CREATE TABLE IF NOT EXISTS `clearing` (
  `clearID` int(11) NOT NULL AUTO_INCREMENT,
  `cli_no` varchar(11) DEFAULT NULL,
  `clearing` varchar(20) DEFAULT NULL,
  `co_no` int(11) DEFAULT NULL,
  `company` varchar(35) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `customerID` int(11) NOT NULL,
  `lastModifiedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`clearID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table lafferty_jjixgbv9my802728.clients
CREATE TABLE IF NOT EXISTS `clients` (
  `clientsID` int(11) NOT NULL AUTO_INCREMENT,
  `cli_no` varchar(11) DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL,
  `cli_name` varchar(40) DEFAULT NULL,
  `address` varchar(62) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `rep_no` int(11) DEFAULT NULL,
  `branch_no` int(11) DEFAULT NULL,
  `birth_date` datetime DEFAULT NULL,
  `last_trade` datetime DEFAULT NULL,
  `addr` varchar(30) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `zip` varchar(50) DEFAULT NULL,
  `lname` varchar(25) DEFAULT NULL,
  `fname` varchar(15) DEFAULT NULL,
  `middle` char(1) DEFAULT NULL,
  `soc_sec` varchar(11) DEFAULT NULL,
  `employer` varchar(40) DEFAULT NULL,
  `empaddr` varchar(40) DEFAULT NULL,
  `nocontact` char(1) DEFAULT NULL,
  `customerID` int(11) DEFAULT NULL,
  `lastModifiedDate` datetime DEFAULT NULL,
  `addr2` varchar(30) DEFAULT NULL,
  `longname` varchar(200) DEFAULT NULL,
  `acct_type` varchar(25) DEFAULT NULL,
  `inact_date` datetime DEFAULT NULL,
  `nac_date` datetime DEFAULT NULL,
  `jtsoc_sec` varchar(11) DEFAULT NULL,
  `jtname` varchar(45) DEFAULT NULL,
  `jtdob` datetime DEFAULT NULL,
  `closed` datetime DEFAULT NULL,
  `rap` datetime DEFAULT NULL,
  `cru_date` datetime DEFAULT NULL,
  `m_addr` varchar(30) DEFAULT NULL,
  `m_addr2` varchar(30) DEFAULT NULL,
  `m_city` varchar(30) DEFAULT NULL,
  `m_state` varchar(2) DEFAULT NULL,
  `m_zip` varchar(10) DEFAULT NULL,
  `open_date` datetime DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`clientsID`)
) ENGINE=InnoDB AUTO_INCREMENT=8192 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table lafferty_jjixgbv9my802728.clipol
CREATE TABLE IF NOT EXISTS `clipol` (
  `clipolID` int(11) NOT NULL AUTO_INCREMENT,
  `cli_no` varchar(11) DEFAULT NULL,
  `policy` varchar(20) DEFAULT NULL,
  `co_no` int(11) DEFAULT NULL,
  `inv_no` int(11) DEFAULT NULL,
  `inv_type` int(11) DEFAULT NULL,
  `rep_no` int(11) DEFAULT NULL,
  `ins_type` int(11) DEFAULT NULL,
  `det_type` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `cash` decimal(12,2) DEFAULT NULL,
  `benefit` decimal(12,2) DEFAULT NULL,
  `premium` decimal(12,2) DEFAULT NULL,
  `cashtype` int(11) DEFAULT NULL,
  `notissued` int(11) DEFAULT NULL,
  `invest` varchar(50) DEFAULT NULL,
  `incep_date` datetime DEFAULT NULL,
  `company` varchar(50) DEFAULT NULL,
  `customerid` int(11) DEFAULT NULL,
  `lastModifiedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`clipolID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table lafferty_jjixgbv9my802728.clisuit
CREATE TABLE IF NOT EXISTS `clisuit` (
  `clisuitID` int(11) NOT NULL AUTO_INCREMENT,
  `cli_no` varchar(11) DEFAULT NULL,
  `income` int(11) DEFAULT NULL,
  `net_worth` int(11) DEFAULT NULL,
  `taxbracket` int(11) DEFAULT NULL,
  `liquid_net` int(11) DEFAULT NULL,
  `risktol` int(11) DEFAULT NULL,
  `objectives` int(11) DEFAULT NULL,
  `marital` int(11) DEFAULT NULL,
  `obtained` int(11) DEFAULT NULL,
  `acctsour` int(11) DEFAULT NULL,
  `sourfund` int(11) DEFAULT NULL,
  `invknow` int(11) DEFAULT NULL,
  `know_stk` int(11) DEFAULT NULL,
  `know_mf` int(11) DEFAULT NULL,
  `know_bnd` int(11) DEFAULT NULL,
  `know_va` int(11) DEFAULT NULL,
  `know_opt` int(11) DEFAULT NULL,
  `know_lp` int(11) DEFAULT NULL,
  `user_s` varchar(3) DEFAULT NULL,
  `expyr_mut` int(11) DEFAULT NULL,
  `expyr_stk` int(11) DEFAULT NULL,
  `expyr_bnd` int(11) DEFAULT NULL,
  `expyr_opt` int(11) DEFAULT NULL,
  `expyr_spf` int(11) DEFAULT NULL,
  `expyr_ann` int(11) DEFAULT NULL,
  `expyr_alt` int(11) DEFAULT NULL,
  `expyr_mgn` int(11) DEFAULT NULL,
  `txpyr_mut` int(11) DEFAULT NULL,
  `txpyr_stk` int(11) DEFAULT NULL,
  `txpyr_bnd` int(11) DEFAULT NULL,
  `txpyr_opt` int(11) DEFAULT NULL,
  `txpyr_spf` int(11) DEFAULT NULL,
  `txpyr_ann` int(11) DEFAULT NULL,
  `txpyr_alt` int(11) DEFAULT NULL,
  `txpyr_mgn` int(11) DEFAULT NULL,
  `expann` int(11) DEFAULT NULL,
  `expspec` int(11) DEFAULT NULL,
  `expspectf` int(11) DEFAULT NULL,
  `liq_need` int(11) DEFAULT NULL,
  `decmaker` varchar(10) DEFAULT NULL,
  `port_part` int(11) DEFAULT NULL,
  `acct_use` int(11) DEFAULT NULL,
  `acct_useo` varchar(25) DEFAULT NULL,
  `timehor` int(11) DEFAULT NULL,
  `signdate` datetime DEFAULT NULL,
  `signer` varchar(40) DEFAULT NULL,
  `newfld` varchar(10) DEFAULT NULL,
  `clirecno` int(11) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `edited` datetime DEFAULT NULL,
  `creator` varchar(3) DEFAULT NULL,
  `editor` varchar(3) DEFAULT NULL,
  `assets` int(11) DEFAULT NULL,
  `ann_exp` int(11) DEFAULT NULL,
  `customerID` int(11) NOT NULL,
  `lastModifiedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`clisuitID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table lafferty_jjixgbv9my802728.company
CREATE TABLE IF NOT EXISTS `company` (
  `companyID` int(11) NOT NULL AUTO_INCREMENT,
  `company` varchar(35) NOT NULL,
  `customerID` int(11) NOT NULL,
  `lastModifiedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`companyID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table lafferty_jjixgbv9my802728.customers
CREATE TABLE IF NOT EXISTS `customers` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `customerName` varchar(200) NOT NULL,
  `webpath` varchar(50) NOT NULL,
  `lastImportDate` datetime DEFAULT NULL,
  `odbcdsn` varchar(50) DEFAULT NULL,
  `fieldList_acctPos` varchar(1000) DEFAULT NULL,
  `fieldList_clients` varchar(1000) DEFAULT NULL,
  `fieldList_permrep` varchar(1000) DEFAULT NULL,
  `fieldList_trades` varchar(1000) DEFAULT NULL,
  `fieldList_branches` varchar(1000) DEFAULT NULL,
  `fieldList_acctBal` varchar(1000) DEFAULT NULL,
  `fieldList_clearing` varchar(1000) DEFAULT NULL,
  `fileProcessed_acctPos` tinyint(1) DEFAULT NULL,
  `fileProcessed_clients` tinyint(1) DEFAULT NULL,
  `fileProcessed_permrep` tinyint(1) DEFAULT NULL,
  `fileProcessed_trades` tinyint(1) DEFAULT NULL,
  `fileProcessed_branches` tinyint(1) DEFAULT NULL,
  `fileProcessed_acctBal` tinyint(1) DEFAULT NULL,
  `fileProcessed_clearing` tinyint(1) DEFAULT NULL,
  `logoFile` varchar(100) DEFAULT NULL,
  `homeURL` varchar(200) DEFAULT NULL,
  `accessPhone` varchar(50) DEFAULT NULL,
  `testfield` tinyint(1) DEFAULT NULL,
  `fieldList_clipol` varchar(1000) DEFAULT NULL,
  `fieldList_clisuit` varchar(1000) DEFAULT NULL,
  `fileProcessed_clipol` tinyint(1) DEFAULT NULL,
  `fileProcessed_clisuit` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`customerID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table lafferty_jjixgbv9my802728.importlog
CREATE TABLE IF NOT EXISTS `importlog` (
  `importID` int(11) NOT NULL AUTO_INCREMENT,
  `customerID` int(11) NOT NULL,
  `success` tinyint(1) NOT NULL,
  `message` varchar(500) DEFAULT NULL,
  `logDateTime` datetime NOT NULL,
  PRIMARY KEY (`importID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table lafferty_jjixgbv9my802728.invest
CREATE TABLE IF NOT EXISTS `invest` (
  `investID` int(11) NOT NULL AUTO_INCREMENT,
  `invest` varchar(35) NOT NULL,
  `customerID` int(11) NOT NULL,
  `lastModifiedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`investID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table lafferty_jjixgbv9my802728.permrep
CREATE TABLE IF NOT EXISTS `permrep` (
  `permRepID` int(11) NOT NULL AUTO_INCREMENT,
  `rep_no` int(11) DEFAULT NULL,
  `clear_no` varchar(5) DEFAULT NULL,
  `fname` varchar(20) DEFAULT NULL,
  `lname` varchar(20) DEFAULT NULL,
  `middle` varchar(1) DEFAULT NULL,
  `suffix` varchar(3) DEFAULT NULL,
  `h_addr` varchar(30) DEFAULT NULL,
  `h_city` varchar(24) DEFAULT NULL,
  `h_state` varchar(2) DEFAULT NULL,
  `h_zip` varchar(50) DEFAULT NULL,
  `m_addr` varchar(30) DEFAULT NULL,
  `m_addr2` varchar(30) DEFAULT NULL,
  `m_city` varchar(24) DEFAULT NULL,
  `m_state` varchar(2) DEFAULT NULL,
  `m_zip` varchar(50) DEFAULT NULL,
  `m_phone` varchar(13) DEFAULT NULL,
  `h_phone` varchar(13) DEFAULT NULL,
  `fax` varchar(13) DEFAULT NULL,
  `soc_sec` varchar(11) DEFAULT NULL,
  `taxid` varchar(50) DEFAULT NULL,
  `emp_date` datetime DEFAULT NULL,
  `crd_no` varchar(7) DEFAULT NULL,
  `term_date` datetime DEFAULT NULL,
  `lp_states` char(54) DEFAULT NULL,
  `mut_states` char(54) DEFAULT NULL,
  `sec_states` char(54) DEFAULT NULL,
  `va_states` char(54) DEFAULT NULL,
  `fa_states` char(54) DEFAULT NULL,
  `l_states` char(54) DEFAULT NULL,
  `ria_states` char(54) DEFAULT NULL,
  `branch` varchar(20) DEFAULT NULL,
  `branch_no` varchar(5) DEFAULT NULL,
  `override` int(11) DEFAULT NULL,
  `over_rate` decimal(5,3) DEFAULT NULL,
  `override2` int(11) DEFAULT NULL,
  `over2_rate` decimal(5,3) DEFAULT NULL,
  `override3` int(11) DEFAULT NULL,
  `over3_rate` decimal(5,3) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `paytype` tinyint(4) DEFAULT NULL,
  `notes` text,
  `equi_acct` varchar(9) DEFAULT NULL,
  `commbasis` tinyint(4) DEFAULT NULL,
  `frn_dom` tinyint(4) DEFAULT NULL,
  `seccalc` tinyint(4) DEFAULT NULL,
  `branch1` varchar(5) DEFAULT NULL,
  `branch2` varchar(5) DEFAULT NULL,
  `branch3` varchar(5) DEFAULT NULL,
  `pay_tot` decimal(10,2) DEFAULT NULL,
  `gross_tot` decimal(10,2) DEFAULT NULL,
  `sec_calc` tinyint(4) DEFAULT NULL,
  `defer_rate` decimal(5,3) DEFAULT NULL,
  `defer_amt` decimal(8,2) DEFAULT NULL,
  `spl_rep` int(11) DEFAULT NULL,
  `spl_rate` decimal(5,3) DEFAULT NULL,
  `spl_rep2` int(11) DEFAULT NULL,
  `spl2_rate` decimal(5,3) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `webpswd` varchar(50) DEFAULT NULL,
  `insur` tinyint(4) DEFAULT NULL,
  `ria` tinyint(4) DEFAULT NULL,
  `cfp` tinyint(4) DEFAULT NULL,
  `cfa` tinyint(4) DEFAULT NULL,
  `clu` tinyint(4) DEFAULT NULL,
  `cpa` tinyint(4) DEFAULT NULL,
  `chfa` tinyint(4) DEFAULT NULL,
  `sal_no` varchar(20) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `accessLevel` tinyint(4) DEFAULT NULL,
  `customerID` varchar(10) DEFAULT NULL,
  `lastModifiedDate` datetime DEFAULT NULL,
  `mgr_rep` tinyint(1) DEFAULT NULL,
  `bnd_states` char(54) DEFAULT NULL,
  `opt_states` char(54) DEFAULT NULL,
  `osjmgr` int(11) DEFAULT NULL,
  `osjmgr2` int(11) DEFAULT NULL,
  `u5rep` int(11) DEFAULT NULL,
  `u5plus` int(11) DEFAULT NULL,
  `clear_no2` varchar(10) DEFAULT NULL,
  `clear_no3` varchar(10) DEFAULT NULL,
  `brchmgr` char(1) DEFAULT NULL,
  `rep_link` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`permRepID`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table lafferty_jjixgbv9my802728.prodtype
CREATE TABLE IF NOT EXISTS `prodtype` (
  `prodtypeID` int(11) NOT NULL AUTO_INCREMENT,
  `product` varchar(35) NOT NULL,
  `abbrev` varchar(3) DEFAULT NULL,
  `inv_type` smallint(6) DEFAULT NULL,
  `customerID` int(11) NOT NULL,
  `lastModifiedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`prodtypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table lafferty_jjixgbv9my802728.states
CREATE TABLE IF NOT EXISTS `states` (
  `stateid` int(11) NOT NULL AUTO_INCREMENT,
  `statename` varchar(30) NOT NULL,
  `stateabbrev` varchar(3) NOT NULL,
  `bitIndex` int(11) DEFAULT NULL,
  PRIMARY KEY (`stateid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table lafferty_jjixgbv9my802728.trades
CREATE TABLE IF NOT EXISTS `trades` (
  `tradesID` int(11) NOT NULL AUTO_INCREMENT,
  `trade_no` int(11) NOT NULL,
  `dateTrade` datetime NOT NULL,
  `set_date` datetime DEFAULT NULL,
  `cli_no` varchar(11) DEFAULT NULL,
  `cli_name` varchar(40) DEFAULT NULL,
  `invest` varchar(50) DEFAULT NULL,
  `inv_no` int(11) DEFAULT NULL,
  `net_amt` decimal(13,2) DEFAULT NULL,
  `comm_exp` decimal(9,2) DEFAULT NULL,
  `comm_rec` decimal(9,2) DEFAULT NULL,
  `charge` decimal(8,2) DEFAULT NULL,
  `date_rec` datetime DEFAULT NULL,
  `pay_date` datetime DEFAULT NULL,
  `rep_comm` decimal(10,2) DEFAULT NULL,
  `rep_no` int(11) DEFAULT NULL,
  `sal_no` varchar(20) DEFAULT NULL,
  `branch_mgr` varchar(40) DEFAULT NULL,
  `branch_no` varchar(50) DEFAULT NULL,
  `inv_type` tinyint(4) DEFAULT NULL,
  `rep_name` varchar(40) DEFAULT NULL,
  `up_date` datetime DEFAULT NULL,
  `hold` char(1) DEFAULT NULL,
  `override` varchar(10) DEFAULT NULL,
  `override2` int(11) DEFAULT NULL,
  `override3` int(11) DEFAULT NULL,
  `over_rate` decimal(7,5) DEFAULT NULL,
  `over2_rate` decimal(7,5) DEFAULT NULL,
  `over3_rate` decimal(7,5) DEFAULT NULL,
  `over_comm` decimal(10,2) DEFAULT NULL,
  `over2_comm` decimal(10,2) DEFAULT NULL,
  `over3_comm` decimal(10,2) DEFAULT NULL,
  `spl_rep2` int(11) DEFAULT NULL,
  `spl_rep3` int(11) DEFAULT NULL,
  `holdDate` datetime DEFAULT NULL,
  `holdNote` varchar(25) DEFAULT NULL,
  `customerID` varchar(10) DEFAULT NULL,
  `lastModifiedDate` datetime DEFAULT NULL,
  `spl_rep` varchar(10) DEFAULT NULL,
  `spl_rep4` varchar(10) DEFAULT NULL,
  `spl_rep5` varchar(10) DEFAULT NULL,
  `spl_amt` varchar(10) DEFAULT NULL,
  `spl_amt2` decimal(10,2) DEFAULT NULL,
  `spl_amt3` decimal(10,2) DEFAULT NULL,
  `spl_amt4` varchar(10) DEFAULT NULL,
  `spl_amt5` varchar(10) DEFAULT NULL,
  `spl_chg` varchar(10) DEFAULT NULL,
  `spl_chg2` varchar(10) DEFAULT NULL,
  `spl_chg3` varchar(10) DEFAULT NULL,
  `spl_chg4` varchar(10) DEFAULT NULL,
  `spl_chg5` varchar(10) DEFAULT NULL,
  `spl_comm` varchar(10) DEFAULT NULL,
  `spl2_comm` decimal(10,2) DEFAULT NULL,
  `spl3_comm` decimal(10,2) DEFAULT NULL,
  `spl4_comm` varchar(10) DEFAULT NULL,
  `spl5_comm` varchar(10) DEFAULT NULL,
  `clearing` varchar(20) DEFAULT NULL,
  `cusip_no` varchar(9) DEFAULT NULL,
  `rep_rate` decimal(7,5) DEFAULT NULL,
  `source` varchar(2) DEFAULT NULL,
  `bank_no` varchar(10) DEFAULT NULL,
  `co_no` smallint(6) DEFAULT NULL,
  `buy_sell` varchar(10) DEFAULT NULL,
  `units` int(11) DEFAULT NULL,
  `price` decimal(10,4) DEFAULT NULL,
  `in_user` varchar(10) DEFAULT NULL,
  `edit_user` varchar(10) DEFAULT NULL,
  `post_user` varchar(10) DEFAULT NULL,
  `batch` smallint(6) DEFAULT NULL,
  `err_code` varchar(50) DEFAULT NULL,
  `cancel` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`tradesID`)
) ENGINE=InnoDB AUTO_INCREMENT=16384 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table lafferty_jjixgbv9my802728.upclient
CREATE TABLE IF NOT EXISTS `upclient` (
  `upclientID` int(11) NOT NULL AUTO_INCREMENT,
  `list_no` int(11) DEFAULT NULL,
  `list_group` varchar(10) DEFAULT NULL,
  `descript` varchar(30) DEFAULT NULL,
  `customerID` int(11) NOT NULL,
  `lastModifiedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`upclientID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
-- Dumping structure for table lafferty_jjixgbv9my802728.upclienta
CREATE TABLE IF NOT EXISTS `upclienta` (
  `upclientaID` int(11) NOT NULL AUTO_INCREMENT,
  `fieldname` varchar(10) DEFAULT NULL,
  `list_group` varchar(10) DEFAULT NULL,
  `descript` varchar(30) DEFAULT NULL,
  `customerID` int(11) NOT NULL,
  `lastModifiedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`upclientaID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
