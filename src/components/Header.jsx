import { motion } from 'framer-motion';
import { MoonIcon, StarIcon } from '@heroicons/react/24/solid';

function Header({ currentDay, hasStarted }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center text-white relative"
    >
      <div className="absolute inset-0 islamic-pattern opacity-10" />
      
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute left-1/4 -top-12 w-24 h-24"
        >
          <img
            src="https://media.istockphoto.com/id/1463293396/vector/flat-design-ramadan-kareem-background.jpg?s=612x612&w=0&k=20&c=oOQUJgOpy0QG3m2LVArP-LIka5ywHa-MztgLj9wuLtI="
            alt=""
            className="w-full h-full opacity-30"
          />
        </motion.div>

        <div className="flex justify-center items-center gap-6 mb-8">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="lantern-glow"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzx3ze_laYQnTQPMSvQhZ0EBpiv-L0x7B8LQ&s"
              alt=""
              className="w-16 h-16"
            />
          </motion.div>
          
          <h1 className="text-6xl font-display text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">
            Ramadan
            <span className="block text-4xl mt-2 font-arabic">
              رمضان كريم
            </span>
          </h1>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            className="lantern-glow"
          >
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/fca49a9194679.5602d3c338be9.jpg"
              alt=""
              className="w-16 h-16"
            />
          </motion.div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xl text-primary-200 mb-8 font-display"
      >
        Track your daily ibadah and make the most of this blessed month
      </motion.p>

      {hasStarted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="inline-block px-10 py-4 glass-effect rounded-full decorative-border"
        >
          <span className="text-3xl font-display text-primary-100">
            Day {currentDay} of Ramadan
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Header;