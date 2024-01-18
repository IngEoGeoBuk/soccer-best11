import pandas as pd
import numpy as np
import requests

def extract_player_ids(player_urls):
    player_ids = []

    for url in player_urls:
        # Extract the part of the URL containing the player ID
        player_id_part = url.split('/player/')[1].split('/')[0]
        player_id_part = player_id_part[:3] + '/' + player_id_part[3:]

        # Add the extracted player ID to the result array
        player_ids.append(f'/player/{player_id_part}')

    return player_ids

def convert_to_image_urls(player_ids):
    image_urls = []

    for player_id in player_ids:
        player_id = player_id.replace('/player/', '/players/')
        # Create the image URL
        image_url = f'https://cdn.sofifa.net{player_id}/24_60.png'
        image_urls.append(image_url)

    return image_urls

# clubs
clubs = [
    'Manchester City', 'Liverpool', 'Manchester United', 'Chelsea', 'Arsenal', 
    'Real Madrid', 'FC Barcelona', 'Atlético Madrid',
    'Inter', 'Milan', 'Juventus',
    'FC Bayern München', 'Borussia Dortmund', 'RB Leipzig',
    'Feyenoord', 'Ajax', 'PSV',
    'Paris Saint Germain', 'Olympique Lyonnais', 'Olympique de Marseille',
    'Benfica', 'Porto', 'Sporting CP'
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

#option
options = ['player_id', 'fifa_version', 'short_name', 'player_url', 'nationality_name', 'club_name']

data = pd.read_csv('FIFA24.csv');
df = pd.DataFrame(data);

### select row
df = df[options]

### filter by club
df = df[df['club_name'].isin(clubs)]

### replace to abbreviations
for i in range(len(clubs)):
    df = df.replace(clubs[i], club_abbreviations[i])

df = df[df['fifa_version'].isin([24])]

df['player_url'] = convert_to_image_urls(extract_player_ids(df['player_url']))

df.rename(columns={'player_id': 'id'}, inplace=True)
df.rename(columns={'short_name': 'name'}, inplace=True)
df.rename(columns={'nationality_name': 'nationality'}, inplace=True)
df.rename(columns={'club_name': 'club'}, inplace=True)

### save image url to file
image_list = df.values;

for i in range(len(image_list)):
    image_url = image_list[i][3]
    image_name = str(image_list[i][0]) + '.png'
    r = requests.get(image_url)
    with open(image_name, 'wb') as outfile:
        outfile.write(r.content)

### save filtered csv
# delete Image, fifa_version column
df = df[['id', 'name', 'nationality', 'club']]
df.to_csv('filtered_data.csv', index=False)