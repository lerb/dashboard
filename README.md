# Dashboard

Dashboard is originally created by user phntxx, and is inspired by SUI.
This version is simply a test-project for me to get used to GitHub and DockerHub.

You can find phntxx's version here: https://github.com/phntxx/dashboard

## Installation using docker on Synology NAS

1. Clone this repository in order to get the JSON-files required for the app to run (apps, bookmarks, imprint, search and themes - all located in /data)
2. Download the image through Docker on your NAS (search for it in the Registry) or pull it with Portainer if you have that set up
3. Launch the downloaded image
4. Give it a name, then click on Advanced Settings.
5. Under "Advanced Settings", enable auto-restart if you fancy that.
6. Under "Volume", press Add Folder and browse to the folder you want to put the JSON-files in (these are the files you will be customizing the dashboard with)
7. Set Mount Path to "/app/data"
8. Under "Port settings" change both Auto to correspond to the ports on the right side - or any other ports if you fancy that.
9. Upload the files from step 1 (apps.json, bookmarks.json, imprint.json, search.json and themes.json) to the folder you specified in step 6
10. Launch and start the container. Done!

## Customization

To customize the content on the dashboard, download the JSON-file you want to change (for example, apps.json), edit it locally with a text editor like notepad++, and upload it again to your NAS - overwriting the old file.
Please note that the files used for customization are the ones in /dashboard/data. NOT the ones in /dashboard/src/components/data.

To find icons to use, browse https://material.io/icons/