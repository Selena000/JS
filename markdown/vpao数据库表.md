vpao-admin用到的表：

|             表名              |                             作用                             |
| :---------------------------: | :----------------------------------------------------------: |
|            po_info            |                       po维度基础信息表                       |
|      po_daily_statistic       |                     po维度统计指标，天表                     |
|    product_daily_statistic    |                    商品维度统计指标，天表                    |
|         product_info          |                      商品维度基础信息表                      |
|   po_board_brand_statistic    |  po看板品牌维度数据<br />汇总每周，每月，每季度，每年的数据  |
|  po_board_category_statistic  |  po看板品类维度数据<br />汇总每周，每月，每季度，每年的数据  |
|  po_board_channel_statistic   | po看板渠道维度数据，<br />汇总每周，每月，每季度，每年的数据 |
| gross_margin_timeline（废除） |           记录无法摊到商品维度的销售收入和成本数据           |
| gross_margin_metadata（废除） |           记录无法摊到商品维度的销售收入和成本数据           |

> vpao



po_info:

|            键名             | 类型 |           说明            |
| :-------------------------: | :--: | :-----------------------: |
|             id              |      |           主键            |
|             po              |      |        采购清单号         |
|           po_type           |      |        PO合作模式         |
|       po_creator_name       |      |         PO创建人          |
|         buyer_group         |      |          买手组           |
|     po_department_name      |      |      PO所属部门名称       |
|     po_department_code      |      |      PO所属部门编码       |
|      po_creation_date       |      |        PO创建时间         |
| responsible_department_name |      |     库存责任部门名称      |
| responsible_department_code |      |     库存责任部门编码      |
|         is_deleted          |      | 软删除标识,0非删除，1删除 |
|         create_time         |      |         创建时间          |
|         update_time         |      |         更新时间          |

sql语句：

```mysql
CREATE TABLE `po_info_dbaddl_id148254` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `po` varchar(255) NOT NULL DEFAULT '' COMMENT '采购清单号',
  `po_type` varchar(255) NOT NULL DEFAULT '' COMMENT 'PO合作模式',
  `po_creator_name` varchar(128) NOT NULL DEFAULT '' COMMENT 'PO创建人',
  `buyer_group` varchar(128) NOT NULL DEFAULT '' COMMENT '买手组',
  `po_department_name` varchar(255) NOT NULL DEFAULT '' COMMENT 'PO所属部门名称',
  `po_department_code` varchar(255) NOT NULL DEFAULT '' COMMENT 'PO所属部门编码',
  `po_creation_date` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' COMMENT 'po创建时间',
  `responsible_department_name` varchar(255) NOT NULL DEFAULT '' COMMENT '库存责任部门名称',
  `responsible_department_code` varchar(255) NOT NULL DEFAULT '' COMMENT '库存责任部门编码',
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0' COMMENT '软删除标识,0非删除，1删除',
  `create_time` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_pi_po` (`po`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='po维度基础信息表';
```

po_daily_statistic:

|           键名           | 类型 |              说明              |
| :----------------------: | :--: | :----------------------------: |
|            id            |      |              主键              |
|            po            |      |         所属采购清单号         |
|         channel          |      |              渠道              |
|     purchase_amount      |      |             订购数             |
|        scrap_num         |      |             报废数             |
|      allocated_num       |      |            已分配数            |
|    for_allotment_num     |      |            待分配数            |
|       sales_volume       |      |       销售数量（分渠道）       |
|          stock           |      |            库存数量            |
|      receive_amout       |      |       实际入仓数（累计）       |
|       stock_avg_30       |      |      日均库存数量（30内）      |
|    groass_margin_rate    |      |             毛利率             |
|   inventory_carry_rate   |      |     库存周转天数（30天内）     |
|      sell_rate_num       |      |     售卖比(数值)，集团层面     |
|     sell_rate_value      |      |    售卖比（货值），集团层面    |
| sell_rate_value_channel  |      |     售卖比(货值)，渠道层面     |
|         pin_rate         |      |          动销率，累计          |
|       sellout_rate       |      |          售罄率，累计          |
|        sales_cost        |      |            销售货值            |
|    sales_cost_avg_30     |      |      日均销售货值（30天）      |
| sles_cost_channel_avg_30 |      | 日均销售货值（30天），渠道成本 |



```mysql
CREATE TABLE `po_daily_statistic` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `po` varchar(255) NOT NULL DEFAULT '' COMMENT '所属采购清单号',
  `channel` varchar(255) NOT NULL DEFAULT '' COMMENT '渠道',
  `purchase_amount` bigint(20) NOT NULL DEFAULT '0' COMMENT '订购数',
  `scrap_num` bigint(20) NOT NULL DEFAULT '0' COMMENT '报废数',
  `allocated_num` bigint(20) NOT NULL DEFAULT '0' COMMENT '已分配数',
  `for_allotment_num` bigint(20) NOT NULL DEFAULT '0' COMMENT '待分配数',
  `sales_volume` bigint(20) NOT NULL DEFAULT '0' COMMENT '销售数量（分渠道）',
  `stock` bigint(20) NOT NULL DEFAULT '0' COMMENT '库存数量',
  `receive_amount` bigint(20) NOT NULL DEFAULT '0' COMMENT '实际入仓数（累计）',
  `stock_avg_30` bigint(20) NOT NULL DEFAULT '0' COMMENT '日均库存数量（30内）',
  `gross_margin_rate` double(10,4) NOT NULL DEFAULT '0.0000' COMMENT '毛利率',
  `inventory_carry_rate` double(20,2) NOT NULL DEFAULT '0.00' COMMENT '库存周转天数（30天内）',
  `sell_rate_num` double(10,4) NOT NULL DEFAULT '0.0000' COMMENT '售卖比(数值)，集团层面',
  `sell_rate_value` double(10,4) NOT NULL DEFAULT '0.0000' COMMENT '售卖比（货值），集团层面',
  `sell_rate_value_channel` double(10,4) NOT NULL DEFAULT '0.0000' COMMENT '售卖比(货值)，渠道层面',
  `pin_rate` double(10,4) NOT NULL DEFAULT '0.0000' COMMENT '动销率，累计',
  `sellout_rate` double(10,4) NOT NULL DEFAULT '0.0000' COMMENT '售罄率，累计',
  `sales_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '销售货值',
  `sales_cost_avg_30` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '日均销售货值（30天）',
  `sales_cost_channel_avg_30` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '日均销售货值（30天），渠道成本',
  `for_allotment_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '待分配货值',
  `for_allotment_cost_avg_30` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '待分配货值(30天日均)',
  `sales_cost_channel` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '销售货值(渠道)',
  `stock_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '库存商品货值',
  `stock_cost_avg_30` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '日均库存商品货值(30天)',
  `stock_cost_channel` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '库存商品货值(渠道)',
  `stock_cost_channel_avg_30` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '日均库存商品货值(30天)，渠道成本',
  `purchase_price` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '采购金额',
  `sales_price` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '销售金额',
  `statistics_day_time` date NOT NULL DEFAULT '1980-01-01' COMMENT '统计数据时间(到天)',
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0' COMMENT '软删除标识,0非删除，1删除',
  `create_time` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `income` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '商品收入（减客退），含税',
  `cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '商品成本（减客退），含税',
  `po_creation_date` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' COMMENT 'po创建时间',
  `sales_volume_total` bigint(20) NOT NULL DEFAULT '0' COMMENT '累计销售数量(分渠道)',
  `allocated_num_plan` bigint(20) NOT NULL DEFAULT '0' COMMENT '分配数(计划)-对应商品天表计划进',
  `allocated_price` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '累计拿货金额，对应本表allocated_num，对应商品天表实际进',
  `inventory_shortage_overage_total` bigint(20) NOT NULL DEFAULT '0' COMMENT '(盘亏-盘盈)数-累计',
  `inventory_shortage_overage_total_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '(盘亏-盘盈)数-累计货值',
  `scrap_num_total` bigint(20) NOT NULL DEFAULT '0' COMMENT '报废数(累计)',
  `scrap_num_total_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '报废数(累计)货值',
  `sales_cost_total` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '销售货值(累计)',
  `stock_refund_total` bigint(20) NOT NULL DEFAULT '0' COMMENT '退供(累计)',
  `stock_refund_total_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '退供(累计货值)',
  `stock_out_channel_total` bigint(20) NOT NULL DEFAULT '0' COMMENT '渠道流转出仓(累计)',
  `stock_out_channel_total_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '渠道流转出仓(累计货值)',
  `stock_shop_physical_minus_add_total` bigint(20) NOT NULL DEFAULT '0' COMMENT '(门店物理库存调减-调增)数-累计',
  `stock_shop_physical_minus_add_total_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '(门店物理库存调减-调增)数-累计货值',
  `stock_shop_on_way` bigint(20) NOT NULL DEFAULT '0' COMMENT '在仓在店库存(当前)',
  `stock_shop_on_way_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '在仓在店库存货值(当前)',
  `stock_on_passage` bigint(20) NOT NULL DEFAULT '0' COMMENT '调拨在途库存(当前)',
  `stock_on_passage_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '调拨在途库存货值(当前)',
  `income_total` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '商品收入累计（减客退），含税',
  `cost_total` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '商品成本累计（减客退），含税',
  `receive_amount_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '入库货值',
  `sell_rate_num_channel` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '售卖比（数值），渠道层面',
  `total_pin_rate` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '动销率，累计，集团层面',
  `total_sellout_rate` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '售罄率，累计，集团层面',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_po_channel_dt` (`po`,`channel`,`statistics_day_time`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='po维度统计指标，天表';
```

product_daily_statistic:

```mysql
CREATE TABLE `product_daily_statistic` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `po` varchar(255) NOT NULL DEFAULT '' COMMENT '所属采购清单号',
  `channel` varchar(255) NOT NULL DEFAULT '' COMMENT '渠道',
  `grade` varchar(255) NOT NULL DEFAULT '' COMMENT '渠道残次等级',
  `barcode` varchar(255) NOT NULL DEFAULT '0' COMMENT '商品条码',
  `purchase_amount` bigint(20) NOT NULL DEFAULT '0' COMMENT '采购数，冗余字段',
  `channel_goods_num_plan` bigint(20) NOT NULL DEFAULT '0' COMMENT '渠道拿货数(计划进)',
  `channel_goods_num_actual` bigint(20) NOT NULL DEFAULT '0' COMMENT '渠道拿货数(实际进)',
  `stock_plan` bigint(20) NOT NULL DEFAULT '0' COMMENT '库存数量（计划存）',
  `stock_actual` bigint(20) NOT NULL DEFAULT '0' COMMENT '库存数量（实际存）',
  `sales_volume` bigint(20) NOT NULL DEFAULT '0' COMMENT '渠道每日销售商品数',
  `cny_taxable_unit_price` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '采购价格（含税/CNY），冗余，相关成本的计算依据',
  `cny_taxable_bill_price` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '结算价格（含税/CNY），冗余，相关成本的计算依据',
  `channel_goods_taxable_price` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '渠道拿货价',
  `receive_amount` bigint(20) NOT NULL DEFAULT '0' COMMENT '实际入仓数（累计）',
  `storage_age` int(16) NOT NULL DEFAULT '0' COMMENT '库龄',
  `scrap_num` bigint(20) NOT NULL DEFAULT '0' COMMENT '报废数',
  `allocated_num` bigint(20) NOT NULL DEFAULT '0' COMMENT '已分配数',
  `for_allotment_num` bigint(20) NOT NULL DEFAULT '0' COMMENT '待分配数',
  `for_allotment_num_avg_30` bigint(20) NOT NULL DEFAULT '0' COMMENT '待分配数（30天日均）',
  `brand_name` varchar(255) NOT NULL DEFAULT '' COMMENT '品牌名称',
  `brand_code` varchar(255) NOT NULL DEFAULT '' COMMENT '品牌编码',
  `first_category_name` varchar(255) NOT NULL DEFAULT '' COMMENT '一级品类',
  `first_category_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '一级品类ID',
  `second_category_name` varchar(255) NOT NULL DEFAULT '' COMMENT '二级品类',
  `second_category_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '二级品类ID',
  `third_category_name` varchar(255) NOT NULL DEFAULT '' COMMENT '三级品类',
  `third_category_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '三级品类ID',
  `stock_avg_30` bigint(20) NOT NULL DEFAULT '0' COMMENT '日均库存数量（30内）',
  `sales_volume_avg_30` bigint(20) NOT NULL DEFAULT '0' COMMENT '日均销售数量（30天内）',
  `sales_volume_total` bigint(20) NOT NULL DEFAULT '0' COMMENT '累计销售数量',
  `sales_volume_30_day` bigint(20) NOT NULL DEFAULT '0' COMMENT '累计销售数量（30天内）',
  `sell_price` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '销售价',
  `for_allotment_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '待分配货值',
  `for_allotment_cost_avg_30` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '待分配货值(30天日均)',
  `sales_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '销售货值（当日）',
  `sales_cost_30_day` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '销售货值(30天)',
  `sales_cost_avg_30` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '日均销售货值（30天）',
  `sales_cost_channel` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '销售货值(渠道成本)',
  `sales_cost_channel_avg_30` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '日均销售货值（30天），渠道成本',
  `stock_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '库存商品货值（用结算价计算出来的）',
  `stock_cost_avg_30` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '日均库存商品货值(30天)',
  `stock_cost_channel` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '库存商品货值(用渠道拿货价算出来的)',
  `stock_cost_channel_avg_30` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '日均库存商品货值(30天)，渠道成本',
  `purchase_price` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '采购金额',
  `sales_price` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '销售金额',
  `sell_rate` double(10,4) NOT NULL DEFAULT '0.0000' COMMENT '售卖比(数值)',
  `inventory_carry_rate_num` double(20,2) NOT NULL DEFAULT '0.00' COMMENT '库存周转天数，数值（30天内）',
  `statistics_day_time` date NOT NULL DEFAULT '1980-01-01' COMMENT '统计数据时间(到天)',
  `gross_margin_rate` double(10,4) NOT NULL DEFAULT '0.0000' COMMENT '毛利率',
  `purchase_amount_today` bigint(20) NOT NULL DEFAULT '0' COMMENT '采购数（今日增量采购），今日采购减昨日采购',
  `purchase_price_today` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '采购金额（今日增量采购金额）',
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0' COMMENT '软删除标识,0非删除，1删除',
  `create_time` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `income` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '商品收入（减客退），含税',
  `cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '商品成本（减客退），含税',
  `po_creation_date` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' COMMENT 'po创建时间',
  `scrap_num_total` bigint(20) NOT NULL DEFAULT '0' COMMENT '报废数(累计)',
  `channel_goods_num_plan_2` bigint(20) NOT NULL DEFAULT '0' COMMENT '渠道拿货数(计划进2)',
  `stock_shop_on_way` bigint(20) NOT NULL DEFAULT '0' COMMENT '在仓在店库存(当前)',
  `stock_on_passage` bigint(20) NOT NULL DEFAULT '0' COMMENT '调拨在途库存(当前)',
  `sales_volume_no_return` bigint(20) NOT NULL DEFAULT '0' COMMENT '销售(当日),不减客退',
  `sales_volume_no_return_total` bigint(20) NOT NULL DEFAULT '0' COMMENT '销售(累计),不减客退',
  `stock_refund` bigint(20) NOT NULL DEFAULT '0' COMMENT '退供(当日)',
  `stock_refund_total` bigint(20) NOT NULL DEFAULT '0' COMMENT '退供(累计)',
  `stock_out_channel` bigint(20) NOT NULL DEFAULT '0' COMMENT '渠道流转出仓(当日)',
  `stock_out_channel_total` bigint(20) NOT NULL DEFAULT '0' COMMENT '渠道流转出仓(累计)',
  `inventory_shortage` bigint(20) NOT NULL DEFAULT '0' COMMENT '盘亏(当日)',
  `inventory_shortage_total` bigint(20) NOT NULL DEFAULT '0' COMMENT '盘亏(累计)',
  `inventory_overage` bigint(20) NOT NULL DEFAULT '0' COMMENT '盘盈(当日)',
  `inventory_overage_total` bigint(20) NOT NULL DEFAULT '0' COMMENT '盘盈(累计)',
  `inventory_shortage_overage_total` bigint(20) NOT NULL DEFAULT '0' COMMENT '(盘亏-盘盈)数-累计',
  `stock_shop_physical_minus` bigint(20) NOT NULL DEFAULT '0' COMMENT '门店物理库存调减(当日)',
  `stock_shop_physical_minus_total` bigint(20) NOT NULL DEFAULT '0' COMMENT '门店物理库存调减(累计)',
  `stock_shop_physical_add` bigint(20) NOT NULL DEFAULT '0' COMMENT '门店物理库存调增(当日)',
  `stock_shop_physical_add_total` bigint(20) NOT NULL DEFAULT '0' COMMENT '门店物理库存调增(累计)',
  `stock_shop_physical_minus_add_total` bigint(20) NOT NULL DEFAULT '0' COMMENT '(门店物理库存调减-调增)数-累计',
  `income_total` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '商品收入累计（减客退），含税',
  `cost_total` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '商品成本累计（减客退），含税',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_pds_pbc` (`po`,`barcode`,`grade`,`channel`),
  KEY `idx_pds_pcfst` (`po`,`channel`,`first_category_id`,`second_category_id`,`third_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品维度统计指标，天表';
```

product_info:

```mysql
CREATE TABLE `product_info` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `po` varchar(255) NOT NULL DEFAULT '' COMMENT '所属采购清单号',
  `barcode` varchar(255) NOT NULL DEFAULT '' COMMENT '商品条码',
  `center_grade` varchar(255) NOT NULL DEFAULT '' COMMENT '中台残次等级',
  `warehouse_code` varchar(255) NOT NULL DEFAULT '' COMMENT '所在仓库',
  `purchase_amount` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '采购数',
  `receive_amount` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '实际入仓数（累计）',
  `inv_type` varchar(255) NOT NULL DEFAULT '' COMMENT '库存属性（SI/VI）',
  `item_size` varchar(255) NOT NULL DEFAULT '' COMMENT '尺码',
  `price_tag` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '吊牌价',
  `spu` varchar(255) NOT NULL DEFAULT '' COMMENT 'SPU',
  `goods_code` varchar(255) NOT NULL DEFAULT '' COMMENT '货号',
  `item_desc` varchar(255) NOT NULL DEFAULT '' COMMENT '商品名称',
  `vendor_code` varchar(255) NOT NULL DEFAULT '' COMMENT '供应商编码',
  `vendor_name` varchar(255) NOT NULL DEFAULT '' COMMENT '供应商名称',
  `brand_name` varchar(255) NOT NULL DEFAULT '' COMMENT '品牌名称',
  `brand_code` varchar(255) NOT NULL DEFAULT '' COMMENT '品牌编码',
  `first_category_name` varchar(255) NOT NULL DEFAULT '' COMMENT '一级品类',
  `first_category_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '一级品类ID',
  `second_category_name` varchar(255) NOT NULL DEFAULT '' COMMENT '二级品类',
  `second_category_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '二级品类ID',
  `third_category_name` varchar(255) NOT NULL DEFAULT '' COMMENT '三级品类',
  `third_category_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '三级品类ID',
  `receive_date` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' COMMENT '首次入库时间',
  `first_put_date` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' COMMENT '首次上架时间',
  `cny_taxable_unit_price` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '采购价格（含税/CNY）',
  `cny_taxable_bill_price` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '结算价格（含税/CNY）',
  `manufactured_datetime` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' COMMENT '生产日期',
  `expiration_datetime` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' COMMENT '过期日期',
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0' COMMENT '软删除标识,0非删除，1删除',
  `create_time` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_pi_pbc` (`po`,`barcode`,`center_grade`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='商品维度基础信息表';
```

po_board_brand_statistic:

```mysql
CREATE TABLE `po_board_brand_statistic` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `po` varchar(255) NOT NULL DEFAULT '' COMMENT '所属采购清单号',
  `channel` varchar(255) NOT NULL DEFAULT '' COMMENT '渠道',
  `brand_code` varchar(255) NOT NULL DEFAULT '' COMMENT '品牌编码',
  `brand_name` varchar(255) NOT NULL DEFAULT '' COMMENT '品牌名称',
  `purchase_amount` bigint(20) NOT NULL DEFAULT '0' COMMENT '订购数',
  `scrap_num` bigint(20) NOT NULL DEFAULT '0' COMMENT '报废数',
  `allocated_num` bigint(20) NOT NULL DEFAULT '0' COMMENT '已分配数',
  `for_allotment_num` bigint(20) NOT NULL DEFAULT '0' COMMENT '待分配数',
  `sales_volume` bigint(20) NOT NULL DEFAULT '0' COMMENT '销售数量',
  `stock` bigint(20) NOT NULL DEFAULT '0' COMMENT '库存数量',
  `gross_margin_rate` double(10,4) NOT NULL DEFAULT '0.0000' COMMENT '毛利率',
  `inventory_carry_rate` double(20,2) NOT NULL DEFAULT '0.00' COMMENT '库存周转天数',
  `sell_rate` double(10,4) NOT NULL DEFAULT '0.0000' COMMENT '售卖比(数值)-累计',
  `pin_rate` double(10,4) NOT NULL DEFAULT '0.0000' COMMENT '动销率，累计',
  `sellout_rate` double(10,4) NOT NULL DEFAULT '0.0000' COMMENT '售罄率，累计',
  `for_allotment_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '待分配货值',
  `sales_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '销售货值',
  `sales_cost_channel` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '销售货值(渠道)',
  `stock_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '库存商品货值(货值)',
  `stock_cost_channel` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '库存商品货值(渠道货值)',
  `purchase_price` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '采购金额',
  `sales_price` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '销售金额',
  `data_type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0-周数据；1-月数据；2-季度数据；3-年数据，4-（T-1天，就是昨天）数据',
  `data_date_year` int(4) NOT NULL DEFAULT '0' COMMENT '年份，格式：2019',
  `data_date_index` int(4) NOT NULL DEFAULT '0' COMMENT '第几周、或第几月、或第几季度，根据data_type决定,值从1开始算起',
  `tag` varchar(255) NOT NULL DEFAULT '' COMMENT '周转天数范围，举例：1120，表示11到20天；010，表示0-10天',
  `sales_cost_avg_30` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '日均销售货值（30天）',
  `for_allotment_cost_avg_30` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '日均待分配货值（30天）',
  `stock_cost_avg_30` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '日均库存商品货值(30天)',
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0' COMMENT '软删除标识,0非删除，1删除',
  `create_time` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `income` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '摊到品牌或品类的销售收入',
  `cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '摊到品牌或品类的销售成本',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='po看板品牌维度数据，汇总每周，每月，每季度，每年的数据';
```

po_board_category_statistic:

```mysql
CREATE TABLE `po_board_category_statistic` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `po` varchar(255) NOT NULL DEFAULT '' COMMENT '所属采购清单号',
  `channel` varchar(255) NOT NULL DEFAULT '' COMMENT '渠道',
  `first_category_name` varchar(255) NOT NULL DEFAULT '' COMMENT '一级品类',
  `first_category_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '一级品类ID',
  `second_category_name` varchar(255) NOT NULL DEFAULT '' COMMENT '二级品类',
  `second_category_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '二级品类ID',
  `third_category_name` varchar(255) NOT NULL DEFAULT '' COMMENT '三级品类',
  `third_category_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '三级品类ID',
  `purchase_amount` bigint(20) NOT NULL DEFAULT '0' COMMENT '订购数',
  `scrap_num` bigint(20) NOT NULL DEFAULT '0' COMMENT '报废数',
  `allocated_num` bigint(20) NOT NULL DEFAULT '0' COMMENT '已分配数',
  `for_allotment_num` bigint(20) NOT NULL DEFAULT '0' COMMENT '待分配数',
  `sales_volume` bigint(20) NOT NULL DEFAULT '0' COMMENT '销售数量',
  `stock` bigint(20) NOT NULL DEFAULT '0' COMMENT '库存数量',
  `gross_margin_rate` double(10,4) NOT NULL DEFAULT '0.0000' COMMENT '毛利率',
  `inventory_carry_rate` double(20,2) NOT NULL DEFAULT '0.00' COMMENT '库存周转天数',
  `sell_rate` double(10,4) NOT NULL DEFAULT '0.0000' COMMENT '售卖比(数值)-累计',
  `pin_rate` double(10,4) NOT NULL DEFAULT '0.0000' COMMENT '动销率，累计',
  `sellout_rate` double(10,4) NOT NULL DEFAULT '0.0000' COMMENT '售罄率，累计',
  `for_allotment_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '待分配货值',
  `sales_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '销售货值',
  `sales_cost_channel` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '销售货值(渠道)',
  `stock_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '库存商品货值(货值)',
  `stock_cost_channel` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '库存商品货值(渠道货值)',
  `purchase_price` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '采购金额',
  `sales_price` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '销售金额',
  `data_type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0-周数据；1-月数据；2-季度数据；3-年数据；4-（T-1天，就是昨天）数据',
  `data_date_year` int(4) NOT NULL DEFAULT '0' COMMENT '年份，格式：2019',
  `data_date_index` int(4) NOT NULL DEFAULT '0' COMMENT '第几周、或第几月、或第几季度，根据data_type决定,值从1开始算起',
  `tag` varchar(255) NOT NULL DEFAULT '' COMMENT '周转天数范围，举例：1120，表示11到20天；010，表示0-10天',
  `sales_cost_avg_30` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '日均销售货值（30天）',
  `for_allotment_cost_avg_30` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '日均待分配货值（30天）',
  `stock_cost_avg_30` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '日均库存商品货值(30天)',
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0' COMMENT '软删除标识,0非删除，1删除',
  `create_time` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `income` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '摊到品牌或品类的销售收入',
  `cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '摊到品牌或品类的销售成本',
  PRIMARY KEY (`id`),
  KEY `idx_pbcs_pcfst` (`po`,`channel`,`first_category_id`,`second_category_id`,`third_category_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='po看板品类维度数据，汇总每周，每月，每季度，每年的数据';
```

po_board_channel_statistic:

```mysql
CREATE TABLE `po_board_channel_statistic` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `po` varchar(255) NOT NULL DEFAULT '' COMMENT '所属采购清单号',
  `channel` varchar(255) NOT NULL DEFAULT '' COMMENT '渠道',
  `purchase_amount` bigint(20) NOT NULL DEFAULT '0' COMMENT '订购数',
  `scrap_num` bigint(20) NOT NULL DEFAULT '0' COMMENT '报废数',
  `allocated_num` bigint(20) NOT NULL DEFAULT '0' COMMENT '已分配数',
  `for_allotment_num` bigint(20) NOT NULL DEFAULT '0' COMMENT '待分配数',
  `sales_volume` bigint(20) NOT NULL DEFAULT '0' COMMENT '销售数量',
  `stock` bigint(20) NOT NULL DEFAULT '0' COMMENT '库存数量',
  `gross_margin_rate` double(10,4) NOT NULL DEFAULT '0.0000' COMMENT '毛利率',
  `inventory_carry_rate` double(20,2) NOT NULL DEFAULT '0.00' COMMENT '库存周转天数',
  `sell_rate` double(10,4) NOT NULL DEFAULT '0.0000' COMMENT '售卖比(数值)，集团层面',
  `pin_rate` double(10,4) NOT NULL DEFAULT '0.0000' COMMENT '动销率，累计',
  `sellout_rate` double(10,4) NOT NULL DEFAULT '0.0000' COMMENT '售罄率，累计',
  `for_allotment_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '待分配货值',
  `sales_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '销售货值',
  `sales_cost_channel` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '销售货值(渠道)',
  `stock_cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '库存商品货值(货值)',
  `stock_cost_channel` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '库存商品货值(渠道货值)',
  `purchase_price` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '采购金额',
  `sales_price` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '销售金额',
  `sales_cost_avg_30` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '日均销售货值（30天）',
  `for_allotment_cost_avg_30` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '日均待分配货值（30天）',
  `stock_cost_avg_30` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '日均库存商品货值(30天)',
  `data_type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0-周数据；1-月数据；2-季度数据；3-年数据',
  `data_date_year` int(4) NOT NULL DEFAULT '0' COMMENT '年份，格式：2019',
  `data_date_index` int(4) NOT NULL DEFAULT '0' COMMENT '第几周、或第几月、或第几季度，根据data_type决定,值从1开始算起',
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0' COMMENT '软删除标识,0非删除，1删除',
  `create_time` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `income` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '摊到品牌或品类的销售收入',
  `cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '摊到品牌或品类的销售成本',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='po看板渠道维度数据，汇总每周，每月，每季度，每年的数据';
```

gross_margin_timeline:

```mysql
CREATE TABLE `gross_margin_timeline` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `channel` varchar(255) NOT NULL DEFAULT '' COMMENT '渠道',
  `brand_code` varchar(255) NOT NULL DEFAULT '' COMMENT '品牌编码',
  `first_category_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '一级品类ID',
  `second_category_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '二级品类ID',
  `third_category_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '三级品类ID',
  `income` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '摊到品牌或品类的销售收入',
  `cost` decimal(20,6) NOT NULL DEFAULT '0.000000' COMMENT '摊到品牌或品类的销售成本',
  `data_type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0-周数据；1-月数据；2-季度数据；3-年数据，4-（T-1天，就是昨天）数据',
  `data_date_year` int(4) NOT NULL DEFAULT '0' COMMENT '年份，格式：2019',
  `data_date_index` int(4) NOT NULL DEFAULT '0' COMMENT '第几周、或第几月、或第几季度，根据data_type决定,值从1开始算起',
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0' COMMENT '软删除标识,0非删除，1删除',
  `create_time` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_gmt_tyi_cb_fst` (`data_type`,`data_date_year`,`data_date_index`,`channel`,`brand_code`,`first_category_id`,`second_category_id`,`third_category_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='记录无法摊到商品维度的销售收入和成本数据';
```

gross_margin_metadata:

```mysql
CREATE TABLE `gross_margin_metadata` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `channel` varchar(255) NOT NULL DEFAULT '' COMMENT '渠道',
  `brand_code` varchar(255) NOT NULL DEFAULT '' COMMENT '品牌编码',
  `first_category_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '一级品类ID',
  `second_category_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '二级品类ID',
  `third_category_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '三级品类ID',
  `income` decimal(38,10) NOT NULL DEFAULT '0.0000000000' COMMENT '摊到品牌或品类的销售收入',
  `cost` decimal(38,10) NOT NULL DEFAULT '0.0000000000' COMMENT '摊到品牌或品类的销售成本',
  `statistics_day_time` date NOT NULL DEFAULT '1980-01-01' COMMENT '统计数据时间(到天)',
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0' COMMENT '软删除标识,0非删除，1删除',
  `create_time` timestamp NOT NULL DEFAULT '1980-01-01 00:00:00' COMMENT '创建时间',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='记录无法摊到商品维度的销售收入和成本数据';
```