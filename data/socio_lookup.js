/**
 *
 * Created by zwhitman on 5/18/2016.
 */

var socio =
    [
        {"Field":"B08013_AVG_TTW","Alias":"Average Travel time to Work for Workers 16 years and over who did not work at home"},
        {"Field":"B08013EST1","Alias":"Aggregate Travel time to work in minutes"},
        //travel time 'Total Workers Traveling to Work'
        {"Field":"B08303_30MINUS_TTW","Alias":"Total Workers Traveling to Work Less than 30 minutes"},
        {"Field":"B08303_30TO59_TTW","Alias":"Total Workers Traveling to Work 30 to 59 minutes"},
        //{"Field":"B08303_30TO59_TTW_PCT","Alias":"Total Workers Traveling to Work 30 to 59 minutes as a %"},
        {"Field":"B08303_60PLUS_TTW","Alias":"Total Workers Traveling to Work 60 or more minutes"},
        //{"Field":"B08303_60PLUS_TTW_PCT","Alias":"Total Workers Traveling to Work 60 or more minutes as a %"},
        {"Field":"B08303EST1","Alias":"Total Workers Traveling to Work"},
        {"Field":"B17019_OWN","Alias":"Families with Income in the past 12 months below poverty level: Owner Occupied"},
        {"Field":"B17019_OWN_PCT","Alias":"Families with Income in the past 12 months below poverty level: Owner Occupied as a %"},
        {"Field":"B17019_RENT","Alias":"Families with Income in the past 12 months below poverty level: Renter Occupied"},
        {"Field":"B17019_RENT_PCT","Alias":"Families with Income in the past 12 months below poverty level: Renter Occupied as a %"},
        {"Field":"B17019EST2","Alias":"Families with Income in the past 12 months below poverty level:"},
        {"Field":"B17021_FAM","Alias":"Universe for Persons in Poverty: In Family Households"},
        {"Field":"B17021_FAM_PCT","Alias":"Universe for Persons in Poverty: In Family Households as a %"},
        {"Field":"B17021EST1","Alias":"Universe for Persons in Poverty"},
        {"Field":"B17021EST14","Alias":"Universe for Persons in Poverty: In non-Family Households"},
        {"Field":"B17021EST14_PCT","Alias":"Universe for Persons in Poverty: In non-Family Households as a %"},
        {"Field":"B17021EST2","Alias":"Universe for Persons in Poverty: Total: Persons in Poverty"},
        {"Field":"B17021EST2_PCT","Alias":"Universe for Persons in Poverty: Total: Persons in Poverty as a %"},

        //hh income
        // deleted: Household Income in the Past 12 Months Between
        {"Field":"B19001_15TO25","Alias":"$15k-$24.9k"},
        {"Field":"B19001_15TO25_PCT","Alias":"$15,000 to $24,999 as a %"},
        {"Field":"B19001_25TO35","Alias":"$25k-$34.9k"},
        {"Field":"B19001_25TO35_PCT","Alias":"$25,000 to $34,999 as a %"},
        {"Field":"B19001_35TO45","Alias":"$35k-$44.9k"},
        {"Field":"B19001_35TO45_PCT","Alias":"$35,000 to $44,999 as a %"},
        {"Field":"B19001_45TO60","Alias":"$45k-$59.9k"},
        {"Field":"B19001_45TO60_PCT","Alias":"$45,000 to $59,999 as a %"},
        {"Field":"B19001_GT150","Alias":">$150k"},
        {"Field":"B19001_GT150_PCT","Alias":"$150,000 as a %"},
        {"Field":"B19001_LT15","Alias":"<$14.9k"},
        {"Field":"B19001_LT15_PCT","Alias":"<$14,999 as a %"},
        {"Field":"B19001EST12","Alias":"$60k- $74.9k"},
        {"Field":"B19001EST12_PCT","Alias":"$60,000 to $74,999 as a %"},
        {"Field":"B19001EST13","Alias":"$75k-$99.9k"},
        {"Field":"B19001EST13_PCT","Alias":"$75,000 to $99,999 as a %"},
        {"Field":"B19001EST14","Alias":"$100k-$124.9k"},
        {"Field":"B19001EST14_PCT","Alias":"$100,000 to $124,999 as a %"},
        {"Field":"B19001EST15","Alias":"$125k-$149.9k"},
        {"Field":"B19001EST15_PCT","Alias":"$125,000 to $149,999 as a %"},

        {"Field":"B19013EST1","Alias":"Median Household Income In The Past 12 Months"},
        {"Field":"B19025EST1","Alias":"Aggregate Household Income In The Past 12 Months"},
        {"Field":"B19113EST1","Alias":"Median Family Income In The Past 12 Months"},
        {"Field":"B19202EST1","Alias":"Median Nonfamily Household Income In The Past 12 Months"},
        {"Field":"B20004EST1","Alias":"Population 25 years and over"},

        //removed - Population 25 years and over having
        {"Field":"B20004EST2","Alias":"Less than High School education"},
        {"Field":"B20004EST3","Alias":"High school graduate education"},
        {"Field":"B20004EST4","Alias":"Some college or associate's degree"},
        {"Field":"B20004EST5","Alias":"Bachelor's degree"},
        {"Field":"B20004EST6","Alias":"Graduate or professional degree"},

        {"Field":"B23001_16TO24","Alias":"Universe Age 16 to 24"},
        {"Field":"B23001_25TO64","Alias":"Universe Age 25 to 65"},
        {"Field":"B23001_ABOVE64","Alias":"Universe Age 65"},
        {"Field":"B23001_CLF","Alias":"Total: In Civilian Labor Force"},
        {"Field":"B23001_UE","Alias":"Total: Unemployed"},
        {"Field":"B23001_UE_16TO24","Alias":"Unemployed Age 16-24"},
        {"Field":"B23001_UE_16TO24_PCT","Alias":"16-24 Unemployment Rate"},
        {"Field":"B23001_UE_25TO64","Alias":"Unemployed Age 25-65"},
        {"Field":"B23001_UE_25TO64_PCT","Alias":"25 - 65 Unemployment Rate"},
        {"Field":"B23001_UE_ABOVE64","Alias":"Unemployed Over Age 65"},
        {"Field":"B23001_UE_ABOVE64_PCT","Alias":"65+ Unemployment Rate"},
        {"Field":"B23001_UE_PCT","Alias":"Overall Unemployment Rate"},
        {"Field":"B23006EST1","Alias":"Population ages 25 to 64"},
        {"Field":"B23006EST13","Alias":"Population ages 25 to 64 Civilian Employed having High School Graduate education"},
        {"Field":"B23006EST13_PCT","Alias":"Population ages 25 to 64 Civilian Employed having High School Graduate education as a %"},
        {"Field":"B23006EST14","Alias":"Population ages 25 to 64 Unemployed having High School Graduate education"},
        {"Field":"B23006EST14_PCT","Alias":"Population ages 25 to 64 Unemployed having High School Graduate education as a %"},
        {"Field":"B23006EST15","Alias":"Population ages 25 to 64 Not in Labor Force having High School Graduate education"},
        {"Field":"B23006EST15_PCT","Alias":"Population ages 25 to 64 Not in Labor Force having High School Graduate education as a %"},
        {"Field":"B23006EST20","Alias":"Population ages 25 to 64 Civilian Employed having Some College or Associate's Degree"},
        {"Field":"B23006EST20_PCT","Alias":"Population ages 25 to 64 Civilian Employed having Some College or Associate's Degree as a %"},
        {"Field":"B23006EST21","Alias":"Population ages 25 to 64 Unemployed having Some College or Associate's Degree"},
        {"Field":"B23006EST21_PCT","Alias":"Population ages 25 to 64 Unemployed having Some College or Associate's Degree as a %"},
        {"Field":"B23006EST22","Alias":"Population ages 25 to 64 Not in Labor Force having Some College or Associate's Degree"},
        {"Field":"B23006EST22_PCT","Alias":"Population ages 25 to 64 Not in Labor Force having Some College or Associate's Degree as a %"},
        {"Field":"B23006EST27","Alias":"Population ages 25 to 64 Civilian Employed having Bachelor's degree or higher"},
        {"Field":"B23006EST27_PCT","Alias":"Population ages 25 to 64 Civilian Employed having Bachelor's degree or higher as a %"},
        {"Field":"B23006EST28","Alias":"Population ages 25 to 64 Unemployed having Bachelor's degree or higher"},
        {"Field":"B23006EST28_PCT","Alias":"Population ages 25 to 64 Unemployed having Bachelor's degree or higher as a %"},
        {"Field":"B23006EST29","Alias":"Population ages 25 to 64 Not in Labor Force having Bachelor's degree or higher"},
        {"Field":"B23006EST29_PCT","Alias":"Population ages 25 to 64 Not in Labor Force having Bachelor's degree or higher as a %"},
        {"Field":"B23006EST6","Alias":"Population ages 25 to 64 Civilian Employed having Less than High School education"},
        {"Field":"B23006EST6_PCT","Alias":"Population ages 25 to 64 Civilian Employed having Less than High School education as a %"},
        {"Field":"B23006EST7","Alias":"Population ages 25 to 64 Unemployed having Less than High School education"},
        {"Field":"B23006EST7_PCT","Alias":"Population ages 25 to 64 Unemployed having Less than High School education as a %"},
        {"Field":"B23006EST8","Alias":"Population ages 25 to 64 Not in Labor Force having Less than High School education"},
        {"Field":"B23006EST8_PCT","Alias":"Population ages 25 to 64 Not in Labor Force having Less than High School education as a %"},
        {"Field":"B24021EST17","Alias":"Service occupations:"},
        {"Field":"B24021EST2","Alias":"Management, professional, and related occupations:"},
        {"Field":"B24021EST25","Alias":"Sales and office occupations:"},
        {"Field":"B24021EST28","Alias":"Farming, fishing, and forestry occupations"},
        {"Field":"B24021EST29","Alias":"Construction, extraction, maintenance, and repair occupations:"},
        {"Field":"B24021EST32","Alias":"Production, transportation and material moving"},
        {"Field":"B25014_CROWD","Alias":"Number of Households with 1 or more occupants per room"},
        {"Field":"B25014_CROWD_PCT","Alias":"% Households with 1 or more occupants per room"},
        {"Field":"B25014_MODCROWD_O","Alias":"Number of Households with 1.01 to 1.50 occupants per room"},
        {"Field":"B25014_MODCROWD_O_PCT","Alias":"Number of Households with 1.01 to 1.50 occupants per room as a %"},
        {"Field":"B25014_MODCROWD_R","Alias":"Number of Households with 1.01 to 1.50 occupants per room"},
        {"Field":"B25014_MODCROWD_R_PCT","Alias":"Number of Households with 1.01 to 1.50 occupants per room as a %"},
        {"Field":"B25014_NONCROWD_O","Alias":"Number of Households with 1.00 or less occupants per room"},
        {"Field":"B25014_NONCROWD_O_PCT","Alias":"Number of Households with 1.00 or less occupants per room as a %"},
        {"Field":"B25014_NONCROWD_R","Alias":"Number of Households with 1.00 or less occupants per room"},
        {"Field":"B25014_NONCROWD_R_PCT","Alias":"Number of Households with 1.00 or less occupants per room as a %"},
        {"Field":"B25014_SEVCROWD_O","Alias":"1.51 or more occupants per room"},
        {"Field":"B25014_SEVCROWD_O_PCT","Alias":"1.51 or more occupants per room as a %"},
        {"Field":"B25014_SEVCROWD_R","Alias":"Number of Households with 1.51 or more occupants per room"},
        {"Field":"B25014_SEVCROWD_R_PCT","Alias":"Number of Households with 1.51 or more occupants per room as a %"},
        {"Field":"B25106_CB","Alias":"Number of Households Paying > 30%"},
        {"Field":"B25106_CB_GT35","Alias":"Number of Households Earning More Than $35,000 paying > 30%"},
        {"Field":"B25106_CB_GT35_PCT","Alias":"Number of Households Earning More Than $35,000 paying > 30% as a %"},
        {"Field":"B25106_CB_LT35","Alias":"Number of Households Earning Less than $34,999 paying > 30%"},
        {"Field":"B25106_CB_LT35_PCT","Alias":"Number of Households Earning Less than $34,999 paying > 30% as a %"},
        {"Field":"B25106_CB_O_GT35","Alias":"Owner OccupiedEarning More than $35,000 paying > 30%"},
        {"Field":"B25106_CB_O_GT35_PCT","Alias":"Owner OccupiedEarning More than $35,000 paying > 30% as a %"},
        {"Field":"B25106_CB_O_LT35","Alias":"Owner Occupied Earning Less than $35,000 paying > 30%"},
        {"Field":"B25106_CB_O_LT35_PCT","Alias":"Owner Occupied Earning Less than $35,000 paying > 30% as a %"},
        {"Field":"B25106_CB_PCT","Alias":"Number of Households Paying > 30% as a %"},
        {"Field":"B25106_CB_R_GT35","Alias":"Renter Occupied Earning More than $35,000 paying > 30%"},
        {"Field":"B25106_CB_R_GT35_PCT","Alias":"Renter Occupied Earning More than $35,000 paying > 30% as a %"},
        {"Field":"B25106_CB_R_LT35","Alias":"Renter Occupied Earning Less than $35,000 paying > 30%"},
        {"Field":"B25106_CB_R_LT35_PCT","Alias":"Renter Occupied Earning Less than $35,000 paying > 30% as a %"},
        {"Field":"C24010_CEMR","Alias":"Construction, extraction, maintenance, and repair occupations:"},
        {"Field":"C24010_CEMR_PCT","Alias":"Construction, extraction, maintenance, and repair occupations: as a %"},
        {"Field":"C24010_FARM","Alias":"Farming, fishing, and forestry occupations"},
        {"Field":"C24010_FARM_PCT","Alias":"Farming, fishing, and forestry occupations as a %"},
        {"Field":"C24010_MPRO","Alias":"Management, business, and financial occupations:"},
        {"Field":"C24010_MPRO_PCT","Alias":"Management, business, and financial occupations: as a %"},
        {"Field":"C24010_PTM","Alias":"Production, transportation, and material moving occupations:"},
        {"Field":"C24010_PTM_PCT","Alias":"Production, transportation, and material moving occupations: as a %"},
        {"Field":"C24010_SALES","Alias":"Sales and office occupations:"},
        {"Field":"C24010_SALES_PCT","Alias":"Sales and office occupations: as a %"},
        {"Field":"C24010_SERVICE","Alias":"Service occupations:"},
        {"Field":"C24010_SERVICE_PCT","Alias":"Service occupations: as a %"},
        {"Field":"C24010EST1","Alias":"Civilian employed population 16 years and over"},
        {"Field":"CIVIL","Alias":"Population ages 25 to 64 Civilian Employed"},
        //{"Field":"CNTY_FIPS","Alias":"County FIPS Code"},
        //{"Field":"COUNTY","Alias":"Census 3-digit FIPS State Code"},
        //{"Field":"EACODE","Alias":"Bureau of Economic Analysis (BEA) Economic Area Code"},
        //{"Field":"EANAME","Alias":"Bureau of Economic Analysis (BEA) Economic Area Name"},
        //{"Field":"GEOID","Alias":"Geographic Identifier"},
        //{"Field":"NAME","Alias":"County Name"},
        {"Field":"NILF","Alias":"Population ages 25 to 64 Not in Labor Force"},
        //{"Field":"OBJECTID","Alias":"OBJECTID"},
        //{"Field":"STATE","Alias":"Census 2-digit FIPS State Code"},
        //{"Field":"STUSAB","Alias":"State US Postal Abbreviation"},
        //{"Field":"TRACT","Alias":"Census 6-digit FIPS COUSUB Code"},
        {"Field":"UNEMP","Alias":"Population ages 25 to 64 Unemployed"}
    ]
