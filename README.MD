# Tinder Matches Exporter / Scraper

## Problem:
+ Tinder account since 2016 + a lot of traveling.
	+ This meant that I had matches around the world with no means to sort them.
	
![MR WORLDWIDE](https://images-na.ssl-images-amazon.com/images/I/61WHhsyhStL._AC_SY355_.jpg)

Some call ya boi mr 305

## Solution:
+ Export all matches to filter/view them in other software.

# Setup Now
```bash
git clone https://github.com/pavlovcik/tinder-scraper.git
cd ./tinder-scraper

# YOU MUST MANUALLY ENTER YOUR FACEBOOK LOGIN CREDENTIALS HERE
cp ./credentials.example.json ./credentials.json

yarn install
yarn build
node ./dist all
# cat ./export.json # My 1100 matches were 2.5MB so you might wanna be careful with how you view it.
```
# Setup Explainer
Only supports login with Facebook.

1. Create `./credentials.json`
```Bash
cp ./credentials.example.json ./credentials.json
```
2. Add your email and password in `./credentials.json`:
 ```json
 {
	"email": "email@email.com",
	"password": "yourpassword",
}
 ```
3. Install dependencies
```bash
yarn install
```

4. Compile TypeScript source code
```bash
yarn build
```
5. Run program


Tell the program how many you want to export. You can export all matches with the following command:
```bash
node ./dist all
```

6. See your results at `./export.json`

### (Example) Export All Matches
`node ./dist all`

### (Example) Export '9' Matches
`node ./dist 9`


### (Example) Exported Profile
```json
{
    "common_friends": [],
    "common_friend_count": 0,
    "spotify_theme_track": {
        "id": "7GFRxsRFuaSgPBxvYnrYDL",
        "name": "Big Dick Energy",
        "album": {
            "id": "6EfgoWAi9aTkmQwEI3tFwK",
            "name": "Big Dick Energy",
            "images": [
                {
                    "height": 640,
                    "width": 640,
                    "url": "https://i.scdn.co/image/711182a618af1b86cd36eb90edebef4129145e7f"
                },
                {
                    "height": 300,
                    "width": 300,
                    "url": "https://i.scdn.co/image/a2b21b04d9cb3c7669ad49f2beb96c491b4ac753"
                },
                {
                    "height": 64,
                    "width": 64,
                    "url": "https://i.scdn.co/image/3792d700e08983a3afe45b458b69f42265281ab4"
                }
            ]
        },
        "artists": [
            {
                "id": "2OaHYHb2XcFPvqL3VsyPzU",
                "name": "Rico Nasty"
            }
        ],
        "preview_url": "https://p.scdn.co/mp3-preview/5d98eba52e3249e9c009a3fa7d7102f809fb3113?cid=b06a803d686e4612bdc074e786e94062",
        "uri": "spotify:track:7GFRxsRFuaSgPBxvYnrYDL"
    },
    "distance_mi": 10000,
    "connection_count": 0,
    "common_connections": [],
    "bio": "Traveling the world looking for a huge adventure!\n\nI’m happily married so mostly looking for alpha friends. \n\nSize.....\n\nSnapChat: Kat_Li96\nIG: KathrineyKit",
    "birth_date": "2019-01-01T00:00:00.000Z",
    "name": "Katherine",
    "instagram": {
        "last_fetch_time": "2020-08-06T18:16:35.770Z",
        "completed_initial_fetch": true,
        "photos": [],
        "media_count": 0,
        "username": "Tinder"
    },
    "is_travelling": true,
    "jobs": [
        {
            "company": {
                "name": "Huawei"
            },
            "title": {
                "name": "Corporate Sales & Marketing"
            }
        }
    ],
    "schools": [
        {
            "name": "Peking University",
            "displayed": false
        }
    ],
    "teasers": [
        {
            "type": "jobPosition",
            "string": "Corporate Sales & Marketing at Huawei"
        },
        {
            "type": "school",
            "string": "Peking University"
        }
    ],
    "hide_age": true,
    "hide_distance": true,
    "gender": 1,
    "show_gender_on_profile": true,
    "birth_date_info": "fuzzy birth date active, not displaying real birth_date",
    "ping_time": "2014-12-09T00:00:00.000Z",
    "badges": [
        {
            "type": "selfie_verified"
        }
    ],
    "photos": [
        {
            "id": "1c3764fd-9720-428d-ac34-798a417ea9d8",
            "crop_info": {
                "user": {
                    "width_pct": 1,
                    "x_offset_pct": 0,
                    "height_pct": 0.8,
                    "y_offset_pct": 0
                },
                "algo": {
                    "width_pct": 0.10019864365458492,
                    "x_offset_pct": 0.48022126108407975,
                    "height_pct": 0.11277721986174583,
                    "y_offset_pct": 0.16208189889788627
                },
                "processed_by_bullseye": true,
                "user_customized": false
            },
            "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/original_1c3764fd-9720-428d-ac34-798a417ea9d8.jpeg",
            "processedFiles": [
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/640x800_1c3764fd-9720-428d-ac34-798a417ea9d8.jpg",
                    "height": 800,
                    "width": 640
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/320x400_1c3764fd-9720-428d-ac34-798a417ea9d8.jpg",
                    "height": 400,
                    "width": 320
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/172x216_1c3764fd-9720-428d-ac34-798a417ea9d8.jpg",
                    "height": 216,
                    "width": 172
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/84x106_1c3764fd-9720-428d-ac34-798a417ea9d8.jpg",
                    "height": 106,
                    "width": 84
                }
            ],
            "fileName": "1c3764fd-9720-428d-ac34-798a417ea9d8.webp",
            "extension": "jpg,webp"
        },
        {
            "id": "8f6ac850-20ef-443e-8f94-6bf86d393a4d",
            "crop_info": {
                "user": {
                    "width_pct": 1,
                    "x_offset_pct": 0,
                    "height_pct": 0.8,
                    "y_offset_pct": 0
                },
                "algo": {
                    "width_pct": 0.5259803547989578,
                    "x_offset_pct": 0.17817999366670847,
                    "height_pct": 0.2337384735047817,
                    "y_offset_pct": 0.07969942865893245
                },
                "processed_by_bullseye": true,
                "user_customized": false
            },
            "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/original_8f6ac850-20ef-443e-8f94-6bf86d393a4d.jpeg",
            "processedFiles": [
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/640x800_8f6ac850-20ef-443e-8f94-6bf86d393a4d.jpg",
                    "height": 800,
                    "width": 640
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/320x400_8f6ac850-20ef-443e-8f94-6bf86d393a4d.jpg",
                    "height": 400,
                    "width": 320
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/172x216_8f6ac850-20ef-443e-8f94-6bf86d393a4d.jpg",
                    "height": 216,
                    "width": 172
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/84x106_8f6ac850-20ef-443e-8f94-6bf86d393a4d.jpg",
                    "height": 106,
                    "width": 84
                }
            ],
            "fileName": "8f6ac850-20ef-443e-8f94-6bf86d393a4d.webp",
            "extension": "jpg,webp"
        },
        {
            "id": "6b9fe31c-1edc-4c40-a73e-557749accb27",
            "crop_info": {
                "user": {
                    "width_pct": 1,
                    "x_offset_pct": 0,
                    "height_pct": 0.8,
                    "y_offset_pct": 0
                },
                "algo": {
                    "width_pct": 0.2742849310627207,
                    "x_offset_pct": 0.4670797217870131,
                    "height_pct": 0.27177659316919744,
                    "y_offset_pct": 0.18331014887429775
                },
                "processed_by_bullseye": true,
                "user_customized": false
            },
            "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/original_6b9fe31c-1edc-4c40-a73e-557749accb27.jpeg",
            "processedFiles": [
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/640x800_6b9fe31c-1edc-4c40-a73e-557749accb27.jpg",
                    "height": 800,
                    "width": 640
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/320x400_6b9fe31c-1edc-4c40-a73e-557749accb27.jpg",
                    "height": 400,
                    "width": 320
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/172x216_6b9fe31c-1edc-4c40-a73e-557749accb27.jpg",
                    "height": 216,
                    "width": 172
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/84x106_6b9fe31c-1edc-4c40-a73e-557749accb27.jpg",
                    "height": 106,
                    "width": 84
                }
            ],
            "fileName": "6b9fe31c-1edc-4c40-a73e-557749accb27.jpg",
            "extension": "jpg,webp"
        },
        {
            "id": "28f87f22-7df8-47a8-9adc-745a85e37d1e",
            "crop_info": {
                "user": {
                    "width_pct": 1,
                    "x_offset_pct": 0,
                    "height_pct": 0.8,
                    "y_offset_pct": 0
                },
                "algo": {
                    "width_pct": 0.18270345707423985,
                    "x_offset_pct": 0.39323234660550954,
                    "height_pct": 0.2092765639373101,
                    "y_offset_pct": 0.06888511065393686
                },
                "processed_by_bullseye": true,
                "user_customized": false
            },
            "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/original_28f87f22-7df8-47a8-9adc-745a85e37d1e.jpeg",
            "processedFiles": [
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/640x800_28f87f22-7df8-47a8-9adc-745a85e37d1e.jpg",
                    "height": 800,
                    "width": 640
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/320x400_28f87f22-7df8-47a8-9adc-745a85e37d1e.jpg",
                    "height": 400,
                    "width": 320
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/172x216_28f87f22-7df8-47a8-9adc-745a85e37d1e.jpg",
                    "height": 216,
                    "width": 172
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/84x106_28f87f22-7df8-47a8-9adc-745a85e37d1e.jpg",
                    "height": 106,
                    "width": 84
                }
            ],
            "fileName": "28f87f22-7df8-47a8-9adc-745a85e37d1e.webp",
            "extension": "jpg,webp"
        },
        {
            "id": "2a056fa9-6596-4b75-a0fb-e78108b142d4",
            "crop_info": {
                "user": {
                    "width_pct": 1,
                    "x_offset_pct": 0,
                    "height_pct": 0.8,
                    "y_offset_pct": 0
                },
                "algo": {
                    "width_pct": 0.124213841999881,
                    "x_offset_pct": 0.32976625524461267,
                    "height_pct": 0.1490311013214523,
                    "y_offset_pct": 0.05885659558698535
                },
                "processed_by_bullseye": true,
                "user_customized": false
            },
            "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/1080x1350_2a056fa9-6596-4b75-a0fb-e78108b142d4.jpg",
            "processedFiles": [
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/640x800_2a056fa9-6596-4b75-a0fb-e78108b142d4.jpg",
                    "height": 800,
                    "width": 640
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/320x400_2a056fa9-6596-4b75-a0fb-e78108b142d4.jpg",
                    "height": 400,
                    "width": 320
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/172x216_2a056fa9-6596-4b75-a0fb-e78108b142d4.jpg",
                    "height": 216,
                    "width": 172
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/84x106_2a056fa9-6596-4b75-a0fb-e78108b142d4.jpg",
                    "height": 106,
                    "width": 84
                }
            ],
            "processedVideos": [
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/640x800_2a056fa9-6596-4b75-a0fb-e78108b142d4.mp4",
                    "height": 800,
                    "width": 640
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/480x600_2a056fa9-6596-4b75-a0fb-e78108b142d4.mp4",
                    "height": 600,
                    "width": 480
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/320x400_2a056fa9-6596-4b75-a0fb-e78108b142d4.mp4",
                    "height": 400,
                    "width": 320
                }
            ],
            "fileName": "2a056fa9-6596-4b75-a0fb-e78108b142d4.mp4",
            "extension": "jpg",
            "main": true
        },
        {
            "id": "205e683b-4210-4ba2-8aa7-fdf703f5eb20",
            "crop_info": {
                "user": {
                    "width_pct": 1,
                    "x_offset_pct": 0,
                    "height_pct": 0.8,
                    "y_offset_pct": 0
                },
                "algo": {
                    "width_pct": 0.2781748067587614,
                    "x_offset_pct": 0.3293732363730669,
                    "height_pct": 0.32620531052351,
                    "y_offset_pct": 0.07904951117932796
                },
                "processed_by_bullseye": true,
                "user_customized": false
            },
            "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/original_205e683b-4210-4ba2-8aa7-fdf703f5eb20.jpeg",
            "processedFiles": [
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/640x800_205e683b-4210-4ba2-8aa7-fdf703f5eb20.jpg",
                    "height": 800,
                    "width": 640
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/320x400_205e683b-4210-4ba2-8aa7-fdf703f5eb20.jpg",
                    "height": 400,
                    "width": 320
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/172x216_205e683b-4210-4ba2-8aa7-fdf703f5eb20.jpg",
                    "height": 216,
                    "width": 172
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/84x106_205e683b-4210-4ba2-8aa7-fdf703f5eb20.jpg",
                    "height": 106,
                    "width": 84
                }
            ],
            "fileName": "205e683b-4210-4ba2-8aa7-fdf703f5eb20.webp",
            "extension": "jpg,webp"
        },
        {
            "id": "64b0e44a-cb3d-4d39-868e-f3241cace11b",
            "crop_info": {
                "user": {
                    "width_pct": 1,
                    "x_offset_pct": 0,
                    "height_pct": 0.8,
                    "y_offset_pct": 0
                },
                "algo": {
                    "width_pct": 0.24047084492631254,
                    "x_offset_pct": 0.3609256722033024,
                    "height_pct": 0.2781216855812818,
                    "y_offset_pct": 0.055124845085665584
                },
                "processed_by_bullseye": true,
                "user_customized": false
            },
            "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/original_64b0e44a-cb3d-4d39-868e-f3241cace11b.jpeg",
            "processedFiles": [
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/640x800_64b0e44a-cb3d-4d39-868e-f3241cace11b.jpg",
                    "height": 800,
                    "width": 640
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/320x400_64b0e44a-cb3d-4d39-868e-f3241cace11b.jpg",
                    "height": 400,
                    "width": 320
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/172x216_64b0e44a-cb3d-4d39-868e-f3241cace11b.jpg",
                    "height": 216,
                    "width": 172
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/84x106_64b0e44a-cb3d-4d39-868e-f3241cace11b.jpg",
                    "height": 106,
                    "width": 84
                }
            ],
            "fileName": "64b0e44a-cb3d-4d39-868e-f3241cace11b.webp",
            "extension": "jpg,webp"
        },
        {
            "id": "ddd3c2f8-47a7-4c03-9fd3-93ee87b37034",
            "crop_info": {
                "user": {
                    "width_pct": 1,
                    "x_offset_pct": 0,
                    "height_pct": 0.8,
                    "y_offset_pct": 0
                },
                "algo": {
                    "width_pct": 0.07147943209856755,
                    "x_offset_pct": 0.45940024722367523,
                    "height_pct": 0.08119267296046018,
                    "y_offset_pct": 0.07099041808396578
                },
                "processed_by_bullseye": true,
                "user_customized": false
            },
            "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/original_ddd3c2f8-47a7-4c03-9fd3-93ee87b37034.jpeg",
            "processedFiles": [
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/640x800_ddd3c2f8-47a7-4c03-9fd3-93ee87b37034.jpg",
                    "height": 800,
                    "width": 640
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/320x400_ddd3c2f8-47a7-4c03-9fd3-93ee87b37034.jpg",
                    "height": 400,
                    "width": 320
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/172x216_ddd3c2f8-47a7-4c03-9fd3-93ee87b37034.jpg",
                    "height": 216,
                    "width": 172
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/84x106_ddd3c2f8-47a7-4c03-9fd3-93ee87b37034.jpg",
                    "height": 106,
                    "width": 84
                }
            ],
            "fileName": "ddd3c2f8-47a7-4c03-9fd3-93ee87b37034.webp",
            "extension": "jpg,webp"
        },
        {
            "id": "ae650dca-7ae8-470c-a87e-ad6c687006de",
            "crop_info": {
                "user": {
                    "width_pct": 1,
                    "x_offset_pct": 0,
                    "height_pct": 0.8,
                    "y_offset_pct": 0
                },
                "algo": {
                    "width_pct": 0.144991668406874,
                    "x_offset_pct": 0.4864377865567803,
                    "height_pct": 0.17429737771861253,
                    "y_offset_pct": 0.07170673171058298
                },
                "processed_by_bullseye": true,
                "user_customized": false
            },
            "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/original_ae650dca-7ae8-470c-a87e-ad6c687006de.jpeg",
            "processedFiles": [
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/640x800_ae650dca-7ae8-470c-a87e-ad6c687006de.jpg",
                    "height": 800,
                    "width": 640
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/320x400_ae650dca-7ae8-470c-a87e-ad6c687006de.jpg",
                    "height": 400,
                    "width": 320
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/172x216_ae650dca-7ae8-470c-a87e-ad6c687006de.jpg",
                    "height": 216,
                    "width": 172
                },
                {
                    "url": "https://images-ssl.gotinder.com/5d54ae90edd2aa1600f3db18/84x106_ae650dca-7ae8-470c-a87e-ad6c687006de.jpg",
                    "height": 106,
                    "width": 84
                }
            ],
            "fileName": "ae650dca-7ae8-470c-a87e-ad6c687006de.webp",
            "extension": "jpg,webp"
        }
    ],
    "user_interests": {
        "selected_interests": [
            {
                "id": "it_2010",
                "name": "Cooking"
            },
            {
                "id": "it_6",
                "name": "Language Exchange"
            },
            {
                "id": "it_14",
                "name": "Shopping"
            },
            {
                "id": "it_2006",
                "name": "Wine"
            },
            {
                "id": "it_43",
                "name": "Working out"
            }
        ]
    },
    "common_likes": [],
    "common_like_count": 0,
    "common_interests": [],
    "bumper_stickers": [
        {
            "enabled": false,
            "id": "1",
            "url": "https://tinder-static-assets-prod.s3.amazonaws.com/election2020/voted.png",
            "ttl": 1604552400
        },
        {
            "enabled": false,
            "id": "2",
            "url": "https://tinder-static-assets-prod.s3.amazonaws.com/election2020/registered.png",
            "ttl": 1604552400
        },
        {
            "enabled": false,
            "id": "3",
            "url": "https://tinder-static-assets-prod.s3.amazonaws.com/election2020/votingearly.png",
            "ttl": 1604552400
        },
        {
            "enabled": false,
            "id": "4",
            "url": "https://tinder-static-assets-prod.s3.amazonaws.com/election2020/pollworker.png",
            "ttl": 1604552400
        }
    ],
    "s_number": 796499686,
    "_id": "5d54ae90edd2aa1600f3db18",
    "is_tinder_u": false
}

```

© 2020 Alexander Pavlovcik
> Donate stablecoins `pavlovcik.eth`
