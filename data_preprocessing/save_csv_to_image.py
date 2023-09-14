#!/usr/bin/env python
# coding: utf-8

# In[9]:


import pandas as pd
import numpy as np
import requests

# clubs
clubs = [
    'Manchester City', 'Liverpool', 'Manchester United', 'Chelsea', 'Arsenal', 
    'Real Madrid CF', 'FC Barcelona', 'Atlético de Madrid',
    'Inter', 'AC Milan', 'Juventus',
    'FC Bayern München', 'Borussia Dortmund', 'RB Leipzig',
    'Feyenoord', 'Ajax', 'PSV'
    'Paris Saint-Germain', 'Olympique Lyonnais', 'Olympique de Marseille',
    'SL Benfica', 'FC Porto', 'Sporting CP',
]
club_abbreviations = [
    'MCI', 'LIV', 'MUN', 'CHE', 'ARS',
    'MAD', 'FCB', 'ATM',
    'INT', 'MIL', 'JUV',
    'BAY', 'DOR', 'RBL',
    'FEY', 'AJA', 'PSV',
    'PSG', 'LYO', 'OLM',
    'SLB', 'POR', 'SLI'
]

# nationality
nationality = [
    'England', 'Spain', 'Italy', 'Germany', 'Netherlands', 'France', 'Portugal'
]
nationality_abbreviations = [
    'ENG', 'ESP', 'ITA', 'GER', 'NED', 'FRA', 'POR'
]

#option
options = ['ID', 'Name', 'Photo', 'Nationality', 'Club']

data = pd.read_csv('FIFA23_official_data.csv');
df = pd.DataFrame(data);

### select row
df = df[options]

### filter by club
df = df[df['Club'].isin(clubs)]

### replace to abbreviations
for i in range(len(clubs)):
    df = df.replace(clubs[i], club_abbreviations[i])
    
for i in range(len(nationality)):
    df = df.replace(nationality[i], nationality_abbreviations[i])

### save filtered csv
# delete Image column
df = df[['ID', 'Name', 'Nationality', 'Club']]
df.to_csv('filtered_data.csv', index=False)

### save image url to file
image_list = df.values;

for i in range(len(image_list)):
    image_url = image_list[i][2]
    image_name = str(image_list[i][0]) + '.png'
    r = requests.get(image_url)
    with open(image_name, 'wb') as outfile:
        outfile.write(r.content)


# In[2]:


import urllib.request


urllib.request.urlretrieve("http://www.python.org/images/success/nasa.jpg",
"NASA.jpg")

