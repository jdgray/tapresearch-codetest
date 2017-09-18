module.exports = function (shipit) {
    require('shipit-deploy')(shipit);
  
    shipit.initConfig({
      default: {
        workspace: '../../../tmp/deploy',
        deployTo: '/var/www/tapresearch',
        repositoryUrl: 'https://github.com/jdgray/tapresearch-codetest.git',
        ignores: ['.git', 'node_modules'],
        rsync: ['--del'],
        keepReleases: 2,
        key: '../../keys/development.pem',
        shallowClone: false
      },
      staging: {
        servers: 'ec2-user@54.68.156.213'
      }
    });
  
    shipit.task('npm', function () {
      return shipit.remote('npm --prefix /var/www/tapresearch/current install /var/www/tapresearch/current');
    });
  
    shipit.task('npmPublic', function () {
      return shipit.remote('npm --prefix /var/www/tapresearch/current install /var/www/tapresearch/current');
    });
  
    shipit.task('restart', function () {
      return shipit.remote('/var/www/start.sh');
    });
  
    shipit.on('deployed', function () {
      //install node deps
      shipit.remote('npm --prefix /var/www/tapresearch/current install /var/www/tapresearch/current', function(){
        //install client deps
        shipit.remote('npm --prefix /var/www/tapresearch/current/public install /var/www/tapresearch/current/public', function(){
          //restart the node process
          shipit.remote('/var/www/start.sh');
        });
      });
    });
  
  };