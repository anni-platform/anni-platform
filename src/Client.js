import Dropbox from 'dropbox';
export default new Dropbox({ accessToken: process.env.CONFIG.DROPBOX_TOKEN });
