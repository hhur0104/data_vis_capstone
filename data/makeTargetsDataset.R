setwd("~/Dropbox (Dropbox @RU)/Capstone/code/data/")

milex <- read.csv("Milex.Current.csv")
rownames(milex) <- milex$Country
mapnames <- read.csv("targets.csv")
rownames(mapnames) <- mapnames$Country

mapnames$Country[mapnames$Country %in% milex$Country]
mapnames$Country[!mapnames$Country %in% milex$Country]
milex$Country[!milex$Country %in% mapnames$Country]


mapnames$Country[mapnames$Country %in% milex$Country]
m <- merge(milex[,c("Country", "Subcont", "X2021")], mapnames, by="row.names", all.y=TRUE)
colnames(m)
m <- m[,c("Row.names","Subcont", "X2021")]
colnames(m) <- c("Country","SubRegion","X2021")
m$"Region" <- m$SubRegion

unique(m$Region)
library(dplyr)
m$Region <- recode("South Asia"="AsiaOceania",
       "Central Europe"="Europe",
       'North Afria'="Africa",
       "sub-Saharan Africa"="Africa",
       "Eastern Europe"="Europe",
       "Oceania"="AsiaOceania",
       "Western Europe"="Europe",
       "Central America and the Caribbean"="Central America",
       "South East Asia"="AsiaOceania",
       "East Asia"="AsiaOceania",
       "Central Asia"="AsiaOceania",
       m$Region)
m$X2021[is.na(m$X2021)] <- 0
m <- m[order(-m$X2021),]

m$top10 <- FALSE
m$top10[1:10] <- TRUE
m$top20 <- FALSE
m$top20[1:20] <- TRUE
write.csv(m, file="targets_mod.csv")
# milex.l <- milex[,c(64:75)]
# milex.d <- data.frame(
#    "row.names" = rownames(milex.l),
#    "Y2011" = as.numeric(milex.l$X2011) - as.numeric(milex.l$X2010),
#    "Y2012" = as.numeric(milex.l$X2012) - as.numeric(milex.l$X2011),
#    "Y2013" = as.numeric(milex.l$X2013) - as.numeric(milex.l$X2012),
#    "Y2014" = as.numeric(milex.l$X2014) - as.numeric(milex.l$X2013),
#    "Y2015" = as.numeric(milex.l$X2015) - as.numeric(milex.l$X2014),
#    "Y2016" = as.numeric(milex.l$X2016) - as.numeric(milex.l$X2015),
#    "Y2017" = as.numeric(milex.l$X2017) - as.numeric(milex.l$X2016),
#    "Y2018" = as.numeric(milex.l$X2018) - as.numeric(milex.l$X2017),
#    "Y2019" = as.numeric(milex.l$X2019) - as.numeric(milex.l$X2018),
#    "Y2020" = as.numeric(milex.l$X2020) - as.numeric(milex.l$X2019),
#    "Y2021" = as.numeric(milex.l$X2021) - as.numeric(milex.l$X2020)
#    )
